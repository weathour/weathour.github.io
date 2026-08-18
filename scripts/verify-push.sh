#!/usr/bin/env bash

set -euo pipefail

remote="origin"
branch="main"
workflow="publish.yml"
wait_seconds="${PUBLISH_WAIT_SECONDS:-120}"
poll_seconds="${PUBLISH_POLL_SECONDS:-3}"

for command_name in git gh; do
	if ! command -v "$command_name" >/dev/null 2>&1; then
		echo "error: required command not found: $command_name" >&2
		exit 1
	fi
done

local_sha="$(git rev-parse HEAD)"
remote_sha="$(git ls-remote "$remote" "refs/heads/$branch" | awk 'NR == 1 { print $1 }')"

if [[ -z "$remote_sha" ]]; then
	echo "error: cannot resolve $remote/$branch" >&2
	exit 1
fi

if [[ "$local_sha" != "$remote_sha" ]]; then
	echo "error: local HEAD and $remote/$branch differ" >&2
	echo "local:  $local_sha" >&2
	echo "remote: $remote_sha" >&2
	exit 1
fi

repo="$(gh repo view --json nameWithOwner --jq .nameWithOwner)"
deadline=$((SECONDS + wait_seconds))
run_id=""

while ((SECONDS < deadline)); do
	run_id="$(gh run list \
		--repo "$repo" \
		--workflow "$workflow" \
		--commit "$local_sha" \
		--event push \
		--limit 1 \
		--json databaseId \
		--jq '.[0].databaseId // empty')"

	if [[ -n "$run_id" ]]; then
		break
	fi

	sleep "$poll_seconds"
done

if [[ -z "$run_id" ]]; then
	echo "error: no $workflow push run appeared for $local_sha within ${wait_seconds}s" >&2
	exit 1
fi

run_url="$(gh run view "$run_id" --repo "$repo" --json url --jq .url)"
echo "watching $run_url"

if ! gh run watch "$run_id" --repo "$repo" --exit-status; then
	echo "error: publication workflow failed for $local_sha" >&2
	echo "inspect: gh run view $run_id --repo $repo --log-failed" >&2
	exit 1
fi

run_metadata="$(gh run view "$run_id" --repo "$repo" --json headSha,event,conclusion --jq '[.headSha, .event, .conclusion] | @tsv')"
IFS=$'\t' read -r run_sha run_event run_conclusion <<<"$run_metadata"

if [[ "$run_sha" != "$local_sha" || "$run_event" != "push" || "$run_conclusion" != "success" ]]; then
	echo "error: workflow result does not match the expected successful push" >&2
	echo "expected SHA/event: $local_sha push" >&2
	echo "actual SHA/event/conclusion: $run_sha $run_event $run_conclusion" >&2
	exit 1
fi

current_head="$(git rev-parse HEAD)"
current_remote_sha="$(git ls-remote "$remote" "refs/heads/$branch" | awk 'NR == 1 { print $1 }')"

if [[ "$current_head" != "$local_sha" || "$current_remote_sha" != "$local_sha" ]]; then
	echo "error: HEAD or $remote/$branch advanced while the workflow was running" >&2
	echo "verified run SHA: $local_sha" >&2
	echo "current HEAD:     $current_head" >&2
	echo "current remote:   $current_remote_sha" >&2
	echo "run pnpm verify:push again for the current commit" >&2
	exit 1
fi

echo "verified: $remote/$branch and $workflow succeeded at $local_sha"
