import * as vscode from "vscode";

let panel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("customStartPage.open", () => {
      openOrReveal(context);
    })
  );

  const cfg = getConfig();
  if (shouldOpenOnStartup(cfg)) {
    openOrReveal(context);
  }

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("customStartPage")) {
        if (panel) {
          updatePanel(panel);
        }
      }
    })
  );
}

export function deactivate() {
  panel = undefined;
}

function shouldOpenOnStartup(cfg: StartConfig): boolean {
  if (cfg.openWhen === "always") return true;
  if (cfg.openWhen === "workspace") {
    return !!vscode.workspace.workspaceFolders?.length;
  }
  return false;
}

function getConfig(): StartConfig {
  const config = vscode.workspace.getConfiguration("customStartPage");
  return {
    url: config.get<string>("url", "https://example.com"),
    openWhen: config.get<"always" | "workspace">("openWhen", "always")
  };
}

function openOrReveal(context: vscode.ExtensionContext) {
  if (panel) {
    panel.reveal(vscode.ViewColumn.Active);
    return;
  }

  panel = vscode.window.createWebviewPanel(
    "customStartPage",
    "Start Page",
    vscode.ViewColumn.Active,
    {
      enableScripts: true
    }
  );

  panel.onDidDispose(() => {
    panel = undefined;
  });

  updatePanel(panel);
}

function updatePanel(target: vscode.WebviewPanel) {
  const cfg = getConfig();
  const url = sanitizeUrl(cfg.url);
  if (!url) {
    target.webview.html = errorHtml("Invalid URL. Check customStartPage.url.");
    return;
  }

  target.title = "Start Page";
  target.webview.html = getWebviewHtml(target.webview, url);

  target.webview.onDidReceiveMessage((msg) => {
    if (msg?.type === "ready") {
      target.webview.postMessage({ type: "config", url: url.toString() });
    }
  });
}

function sanitizeUrl(input: string): URL | undefined {
  try {
    const url = new URL(input);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return url;
  } catch {
    return undefined;
  }
}

function getWebviewHtml(webview: vscode.Webview, url: URL): string {
  const nonce = String(Date.now());
  const origin = url.origin;

  const csp = [
    "default-src 'none'",
    `frame-src ${origin}`,
    `script-src 'nonce-${nonce}'`,
    `style-src 'nonce-${nonce}'`
  ].join("; ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Start Page</title>
<style nonce="${nonce}">
  html, body, iframe { margin: 0; padding: 0; width: 100%; height: 100%; border: 0; }
  body { overflow: hidden; }
</style>
</head>
<body>
<iframe id="frame" src="${url.toString()}" sandbox="allow-scripts allow-forms allow-same-origin"></iframe>
<script nonce="${nonce}">
  const vscode = acquireVsCodeApi();
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'config') {
      const frame = document.getElementById('frame');
      if (frame && frame.src !== event.data.url) {
        frame.src = event.data.url;
      }
    }
  });
  vscode.postMessage({ type: 'ready' });
</script>
</body>
</html>`;
}

function errorHtml(message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<body style="font-family: sans-serif; padding: 16px;">
  <h3>Custom Start Page</h3>
  <p>${message}</p>
</body>
</html>`;
}

type StartConfig = {
  url: string;
  openWhen: "always" | "workspace";
};
