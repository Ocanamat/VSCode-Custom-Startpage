# VSCode Custom Startpage

Minimal VS Code extension that opens a configurable remote URL in a webview
tab on startup. It does not replace the built-in Welcome editor; it opens its
own tab in the editor area.

## Features
- Opens a webview tab on startup or when a command is run.
- Loads a single configured URL.
- Restricts webview navigation to the configured origin via CSP.

## Settings
- `customStartPage.url`: Remote URL to load in the webview.
- `customStartPage.openWhen`: `always` or `workspace`.

## Commands
- `Custom Start Page: Open` (`customStartPage.open`)

## Usage
1) Set `customStartPage.url` in user settings.
2) Optionally set `customStartPage.openWhen` to `workspace`.
3) Restart VS Code or run the command to open the tab.

If you want the Welcome page hidden, set:
- `workbench.startupEditor`: `none`

## Build
```bash
npm install
npm run compile
```

## Package
```bash
npx vsce package
```

## Limitations
- The remote site must allow embedding in an iframe (no restrictive
  `X-Frame-Options` or `frame-ancestors`).
