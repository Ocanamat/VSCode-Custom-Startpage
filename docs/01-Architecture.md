# Architecture

## Goal
Open a single, configured remote URL in a VS Code webview tab at startup.
This does not replace the built-in Welcome editor; it opens its own tab.

## Key Files
- package.json: activation events, command, settings schema.
- src/extension.ts: activation, panel lifecycle, webview HTML.

## Runtime Flow
1) Extension activates on startup via `onStartupFinished`.
2) Reads configuration from `customStartPage.*`.
3) If allowed, opens a webview panel.
4) The webview embeds the configured URL in an iframe.
5) CSP restricts iframe navigation to the configured origin.

## Lifecycle Details
- The panel is created once and re-used if already open.
- Settings changes update the existing panel via `updatePanel`.
- Invalid URLs render an error HTML page instead of the iframe.

## Extension Points Used
- `activationEvents`: `onStartupFinished`, `onCommand:customStartPage.open`
- `commands`: `customStartPage.open`
- `configuration`: `customStartPage.url`, `customStartPage.openWhen`
