"""Browser regression check: pnpm build; pnpm preview --port 18082; python3 scripts/check-comments.py.

Requires Chromium and websocket-client (already available in the local workspace).
"""

import json
import os
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from urllib.request import urlopen

import websocket

base = (sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:18082").rstrip("/")
profile = Path(tempfile.mkdtemp(prefix="blog-comments-", dir=Path.home()))
browser = subprocess.Popen(
    [shutil.which("chromium") or "chromium", "--headless=new", "--no-sandbox",
     "--disable-dev-shm-usage", "--no-proxy-server", "--remote-debugging-port=0",
     f"--user-data-dir={profile}", "--window-size=1280,900", "about:blank"],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
)
try:
    deadline = time.monotonic() + 20
    while not (profile / "DevToolsActivePort").exists():
        assert time.monotonic() < deadline, "Chromium did not start"
        time.sleep(0.1)
    port = (profile / "DevToolsActivePort").read_text().splitlines()[0]
    with urlopen(f"http://127.0.0.1:{port}/json") as response:
        target = next(tab for tab in json.load(response) if tab["type"] == "page")
    connection = websocket.create_connection(target["webSocketDebuggerUrl"], suppress_origin=True, timeout=30)
    sequence = 0

    def command(method, params=None):
        global sequence
        sequence += 1
        connection.send(json.dumps({"id": sequence, "method": method, "params": params or {}}))
        while True:
            result = json.loads(connection.recv())
            if result.get("id") == sequence:
                assert "error" not in result, result
                return result.get("result", {})

    def evaluate(expression):
        result = command("Runtime.evaluate", {"expression": expression, "returnByValue": True, "awaitPromise": True})
        assert "exceptionDetails" not in result, result
        return result.get("result", {}).get("value")

    def wait_for(expression):
        deadline = time.monotonic() + 20
        while not evaluate(expression):
            assert time.monotonic() < deadline, (expression, evaluate("({url: location.href, classes: document.documentElement.className, text: document.body?.innerText.slice(0, 300)})"))
            time.sleep(0.1)

    def state():
        return evaluate("""(() => {
            const widget = document.querySelector('giscus-widget');
            const frames = widget?.shadowRoot?.querySelectorAll('iframe');
            return {count: document.querySelectorAll('giscus-widget').length,
                term: widget?.getAttribute('term'), lang: widget?.getAttribute('lang'),
                theme: widget?.getAttribute('theme'), frames: frames?.length,
                src: frames?.[0]?.src};
        })()""")

    def visit(path, first=False):
        if first:
            response = command("Page.navigate", {"url": base + path})
            assert "errorText" not in response, response
        else:
            evaluate(f"window.swup.navigate({json.dumps(base + path)})")
        wait_for(f"location.pathname === {json.dumps(path)} && !document.documentElement.classList.contains('is-changing')")
        if "/posts/" in path:
            wait_for("!!document.querySelector('giscus-widget')?.shadowRoot?.querySelector('iframe')")
            info = state()
            assert info["count"] == info["frames"] == 1, info
            from urllib.parse import parse_qs, urlparse
            params = parse_qs(urlparse(info["src"]).query)
            assert params["term"] == [info["term"]], info
            assert params["origin"][0].split("#")[0] == base + path, info
        return state()

    command("Page.enable")
    command("Runtime.enable")
    # External services are not needed to check our route/lifecycle integration.
    command("Network.enable")
    command("Network.setBlockedURLs", {"urls": ["https://*"]})
    wait_for("document.readyState === 'complete'")
    # Start on the homepage: the comment module must also initialize on a Swup visit.
    visit("/", first=True)
    wait_for("!!window.swup?.hooks")
    assert state()["count"] == 0
    zh = visit("/posts/from-observation-to-model/")
    assert zh["lang"] == "zh-CN", zh
    en = visit("/en/posts/from-observation-to-model/")
    assert en["term"] == zh["term"] and en["lang"] == "en", en
    evaluate("localStorage.setItem('theme', 'dark'); document.documentElement.classList.add('dark')")
    wait_for("document.querySelector('giscus-widget').getAttribute('theme') === 'dark'")
    other = visit("/posts/mathematical-language-and-problems/")
    assert other["term"] != zh["term"] and other["theme"] == "dark", other
    evaluate("localStorage.setItem('theme', 'light'); document.documentElement.classList.remove('dark')")
    wait_for("document.querySelector('giscus-widget').getAttribute('theme') === 'light'")
    visit("/")
    assert state()["count"] == 0
    visit("/posts/from-observation-to-model/")
    command("Emulation.setDeviceMetricsOverride", {"width": 390, "height": 844, "deviceScaleFactor": 1, "mobile": True})
    assert evaluate("document.documentElement.scrollWidth <= window.innerWidth"), "Mobile horizontal overflow"
    if os.environ.get("COMMENTS_SCREENSHOT"):
        import base64
        evaluate("document.querySelector('#comments').scrollIntoView()")
        time.sleep(2)
        shot = command("Page.captureScreenshot", {"format": "png"})
        Path(os.environ["COMMENTS_SCREENSHOT"]).write_bytes(base64.b64decode(shot["data"]))
    print("PASS: initial Swup entry, shared bilingual thread, distinct articles, current login return URL, themes, homepage, cached revisit, mobile width")
    connection.close()
finally:
    browser.terminate()
    browser.wait(timeout=10)
    shutil.rmtree(profile, ignore_errors=True)
