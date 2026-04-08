---
title: 'From Simulation Repo to Real-Car Integration: Architecture, Runtime Flow, Startup Process, and Practical Usage of onsite-structured-test-master'
postSlug: onsite-structured-test-realcar
published: 2026-04-08
description: A practical long-form overview of onsite-structured-test-master, covering its architecture, functionality, design thinking, Ubuntu validation path, domain-controller startup flow, pre-drive checks, and usage tutorial.
tags: [Autonomous Driving, ROS, Ubuntu, Real-Car Debugging, System Architecture, Engineering]
category: Engineering
draft: false
lang: en
---

`onsite-structured-test-master` originally looked much more like a mixed OnSite / TessNG simulation repository. In this work round, the center of gravity clearly shifted toward the **real-car ROS runtime path**: keep the original repository, refactor it in place, clarify the active runtime boundary, and validate the minimum integration path on local `Ubuntu 20.04 + ROS Noetic`.

This article is not meant to repeat the README and not just to list a few launch commands. The goal is to explain the project as it exists **now**: its architecture, capabilities, design intent, runtime flow, startup process, on-car usage path, and the practical checks that matter before vehicle use.

## 1. What this project is right now

If I compress the current state into one sentence, it is this:

> a repository that still contains simulation and tooling history, but whose active engineering path has now been organized around a ROS-driven real-car runtime.

This is not a clean-sheet rewrite. It is an **in-place engineering transition** from an older simulation-oriented codebase toward a clearer, more maintainable, and more verifiable real-car execution path.

Current repository path:

- `D:\My_Research_data\programs\real-car\onsite-structured-test-master`

The easiest way to understand the repository is to separate it into two layers:

- the **active runtime path** for ROS and real-car integration
- the **historical simulation stack** for OnSite / TessNG / scenario workflows

That distinction matters. Reading only `main.py` is not enough, while reading only the old README is also misleading for the current state.

## 2. The main conclusions from this refactor-and-validation round

### 1. The deep refactor phase has largely converged

I deliberately stopped treating `planner/IDM/idm.py` as the default next battlefield for endless cleanup.

Instead, the focus moved to:

- Ubuntu environment validation
- ROS topic integration
- control-output evidence collection
- pre-drive checks
- startup and handoff documentation

That means the project has shifted from “still under heavy structural surgery” to “ready for validation, handoff, and controlled startup”.

### 2. The active runtime path is no longer best understood through the oldest simulation flow

The most useful mental model for the current active path is:

`main.py`  
-> `app/bootstrap.py`  
-> `app/runtime.py`  
-> `demo/RosMsg.py`  
-> `adapters/ros/*`  
-> `domain/services/*`  
-> `planning/idm/*`  
-> `planner/IDM/idm.py`

In other words:

- `main.py` is still the entrypoint
- orchestration now lives in `app/runtime.py`
- ROS I/O responsibilities are split into `adapters/ros`
- intermediate business semantics live in `domain/services`
- `planner/IDM/idm.py` still matters, but it no longer owns every surrounding responsibility

### 3. The Ubuntu minimum integration path now works, but that is not automatically the same as vehicle clearance

On local `Ubuntu-20.04 + ROS Noetic`, the minimum path has been validated end to end:

- `main.py` starts successfully
- custom ROS message packages resolve correctly
- `demo/mock_inputs.py + rosbag play` drives the runtime loop
- `/debug/cicv_control_cmd` emits control messages during replay

This is a real milestone, but it is still separate from direct vehicle clearance. The remaining gap depends on whether the live vehicle interface contract is unchanged and whether the operational safety process on-site is still aligned with the historically successful setup.

So the practical judgment is:

- if the vehicle-side topic, message, sign, and unit contract is unchanged, the project is suitable for **controlled on-car startup**
- if that contract changed, return to bench-side validation first

## 3. The repository's current functional boundary

### 1. ROS input ingestion

The system currently consumes three main runtime inputs:

- `cicv_location`: ego localization
- `tpperception`: obstacle perception
- `test_trajectory_req`: requested or reference trajectory

The relevant logic is concentrated in:

- `adapters/ros/subscribers.py`
- `demo/RosMsg.py`
- `adapters/ros/converters.py`

`RosMsg` maintains runtime caches for ego, obstacles, and trajectory, while the converter layer maps ROS-adjacent data into structures that the planner path can consume.

### 2. Planning execution

The planning core is still IDM-based, but its surrounding responsibilities are now more clearly split:

- `planning/idm/local_planning.py`
- `planning/idm/collision_flow.py`
- `planning/idm/decision_flow.py`
- `planning/idm/reference_path.py`
- `planning/idm/obstacle_filter.py`
- `planning/idm/ttc.py`
- `planner/IDM/idm.py`

The practical gain is not theoretical purity. The gain is that you can now answer operational questions much faster:

- where path packaging happens
- where collision or TTC logic lives
- where decision switching lives
- what still remains inside legacy `idm.py`

### 3. Control output publication

The final output is still a `ControlCmd` message. That path currently goes through:

- `adapters/ros/publishers.py`
- `adapters/ros/converters.py`
- `domain/services/safety_service.py`

The important fields include:

- `speed`: `m/s`
- `acceleration`: `m/s^2`
- `wheel_angle`: steering-angle semantics
- `gear=3`: typically drive gear

That layer matters because it is the final bridge between planner output and the vehicle-side actuation chain.

### 4. Path visualization output

The runtime also publishes:

- `Local_Path`
- `Global_Path`

These are not the primary actuation path, but they remain very useful for inspection and debugging.

### 5. Historical simulation and scenario tooling

The repository still contains:

- `OnSiteReplay/`
- `TessNG/`
- `scenario/`
- `assets/`
- `config/`

These are not the active minimum real-car runtime path, but they are not meaningless leftovers either. They still represent the original simulation and tooling system that explains why the repository looks hybrid rather than cleanly single-purpose.

## 4. How I now understand the architecture

The cleanest way to understand the project is to read it as four layers.

### 1. App layer: runtime orchestration

This layer answers:

- where the program starts
- where the main loop lives
- who coordinates ROS, planning, publishing, and safety checks

Core files:

- `main.py`
- `app/bootstrap.py`
- `app/runtime.py`

Among these, `app/runtime.py` is the most valuable first read because it defines the runtime rhythm:

1. initialize ROS interfaces
2. initialize scenario and planning services
3. wait for fresh ego messages
4. build an observation
5. call the planner
6. pass through the safety layer
7. publish control and path outputs

### 2. Adapter layer: ROS adaptation

This layer answers:

- which topics are subscribed and published
- where topic names are configured
- how messages become internal structures
- how planner outputs become ROS messages

Core directory:

- `adapters/ros/`

Its value is simple: you do not have to dive into `idm.py` just to understand the runtime contract.

### 3. Domain layer: intermediate semantics

This layer answers:

- what an observation is
- what a control command is
- what the path service does
- what the safety service does

Core directories:

- `domain/models/`
- `domain/services/`

It provides a semantic buffer between ROS messages and planner internals, which makes cleanup and maintenance much more manageable.

### 4. Planning layer: decision and trajectory generation

This is where planning actually happens:

- `planning/idm/*` contains the split planning logic
- `planner/IDM/idm.py` still contains the legacy planner body

This round did not try to eliminate the legacy planner entirely. The practical choice was:

- keep what still works
- extract surrounding responsibilities gradually
- validate the system first
- only then decide whether deeper restructuring is worth the cost

## 5. What was actually fixed in this validation round

This part matters because many of the real reasons the system works now are not obvious from the README alone.

### 1. Runtime blockers in the Ubuntu smoke path were fixed

In `planner/IDM/idm.py`, the `best_index` needed before `build_path_handoff_context(...)` was restored. Several stale variable references were also fixed to read from `planning_state`, including:

- `planning_state.ego_state`
- `planning_state.current_speed`
- `planning_state.lead_car_state`

These were not cosmetic cleanup items. They were direct runtime blockers in the Ubuntu validation path.

### 2. The smoke-test script was fixed for `set -u` compatibility

`run-minimal-ros-smoketest.sh` previously had a ROS sourcing issue under `set -u`. The script now temporarily relaxes that behavior where needed so ROS environment setup does not fail before the actual validation even starts.

### 3. A hidden obstacle-id blocker was removed

This was one of the most important practical fixes.

`adapters/ros/converters.py` previously contained a hardcoded obstacle id `5215`, which effectively meant the runtime only accepted that specific obstacle. If the live or replayed obstacle id did not match, the planner could appear to run while the useful input was actually being silently filtered away.

The behavior is now:

- default: **do not filter obstacle ids**
- special debugging only: narrow by `REAL_CAR_OBSTACLE_ID_FILTER`

That is much closer to what a real integration default should be.

### 4. Obvious garbage and historical leftovers were cleaned up

This round removed:

- `venv/`
- `.idea/`
- `__pycache__/`
- `.pyc/.pyo`
- temporary validation log directories

Historical leftovers that were not suitable for the active root were archived into:

- `.legacy_archive/2026-04-08-cleanup`

That archive includes:

- `planner/IDM/idm (copy).py`
- `planner/IDM/global_path_12 (copy).py`
- `planner/IDM/test_01.py` to `test_04.py`
- `start.sh`
- `run_ubuntu.sh`
- `testPath-inside/`

This keeps the active repository cleaner without destroying traceability.

## 6. The currently recommended startup path

### 1. Do not use the historical `start.sh`

The old `start.sh` has been archived and is no longer the recommended entrypoint. The reasons are practical:

- it binds old paths
- it hides topic assumptions
- it makes environment inspection harder
- it makes step-by-step debugging less transparent

The recommended entrypoint is now:

`main.py -> app/bootstrap.py -> app/runtime.py`

### 2. Ubuntu minimum validation flow

First priority:

- `D:\My_Research_data\programs\real-car\setup\run-minimal-ros-smoketest.sh`

If that fails, split the flow manually into four terminals.

#### Terminal 1: ROS core

```bash
source /opt/ros/noetic/setup.bash
source ~/real-car-ws/chajian/devel/setup.bash
roscore
```

#### Terminal 2: inputs

For mock inputs:

```bash
python3 demo/mock_inputs.py
```

For bag replay:

```bash
rosbag play 2025-03-20-11-43-06.bag
```

#### Terminal 3: main runtime

```bash
cd /mnt/d/My_Research_data/programs/real-car/onsite-structured-test-master
source /opt/ros/noetic/setup.bash
source ~/real-car-ws/chajian/devel/setup.bash
python3 -u main.py
```

#### Terminal 4: control output observation

```bash
rostopic echo /debug/cicv_control_cmd
```

The validation goal is not only “the process did not crash”. It is to confirm:

- the bag is playing
- the runtime loop is active
- control messages are continuously published
- output fields still look physically reasonable

### 3. On-car startup flow

For actual vehicle startup, the current recommended references are:

- `docs/oncar_startup_guide.md`
- `docs/pre_drive_checklist.md`

The simplified standard sequence is:

1. source ROS Noetic and the custom message workspace on the domain controller
2. confirm `cicv_location`, `tpperception`, and `test_trajectory_req` are alive
3. start `main.py`
4. observe `cicv_control_cmd` in a separate terminal
5. only after topic, rate, sign, and unit checks pass, move into low-speed controlled rollout

## 7. What actually changes on the domain controller

If you follow the current method, the domain-controller workflow is more **explicit**, not more complicated.

### Before

Historically, the flow was closer to:

- run an older script
- rely on implicit source commands, hardcoded paths, and hidden topic assumptions
- struggle to localize failures quickly

### Now

The flow is closer to:

1. explicitly source the environment
2. explicitly verify input topics
3. explicitly launch `main.py`
4. explicitly observe control output
5. optionally override topics through environment variables when needed

So the real difference is not that the system capability changed. The difference is:

- the entrypoint is clearer
- troubleshooting is easier
- the workflow no longer depends on opaque historical script assumptions

## 8. How this project is best used now

### 1. As a local replay and integration-validation project

This is the most stable use case right now:

- run on Ubuntu 20.04 + ROS Noetic
- drive it with mock inputs or rosbag replay
- inspect control and path outputs
- verify that the planning chain behaves end to end

### 2. As a controlled on-car startup project

It is also suitable for controlled on-car startup when these conditions hold:

- the vehicle-side interface contract is unchanged
- the historically successful message definitions are unchanged
- sign and unit conventions are unchanged
- site safety driver, takeover path, and estop process are available

### 3. As a better base for future refactoring

The repository is now also in a better position for follow-up engineering:

- continue shrinking `planner/IDM/idm.py`
- further stabilize ROS, domain, and planning boundaries

The key point is that these are no longer prerequisites for validation.

## 9. Recommended documentation entrypoints

If you are taking over the project now, read in this order:

1. `docs/refactor_delivery_note.md`
2. `docs/ubuntu_validation_plan.md`
3. `docs/ubuntu_realcar_smoketest_tutorial.md`
4. `docs/pre_drive_checklist.md`
5. `docs/oncar_startup_guide.md`
6. then return to `main.py`, `app/runtime.py`, `adapters/ros/`, and `planning/idm/`

That sequence is much better than starting from `planner/IDM/idm.py` with no runtime context.

## 10. Final judgment

If the question is simply “what state is this project in now?”, my answer is:

> it is no longer just a confusing legacy repository; it is now a project that has passed minimum Ubuntu integration validation, had key runtime blockers removed, received an initial cleanup pass, and been supplemented with startup and pre-drive documentation.

It is still not perfectly modernized and it still carries legacy structure. But it is already strong enough for the next stage:

- continued controlled validation
- continued bench or replay testing
- renewed on-car startup under the right assumptions
- clearer handoff for future collaborators

If the work continues, the most valuable direction is not blind rewriting. It is to keep following the path that worked here:

- make the runtime path explicit
- collect real validation evidence
- reduce legacy structure gradually
- then decide whether a larger architecture shift is truly worth it

For a project that once ran on the vehicle, then had to be reorganized and revalidated, that is the most realistic and most reliable engineering path.
