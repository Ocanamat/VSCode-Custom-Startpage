# Development

## Local Setup
```bash
npm install
npm run compile
```

## Run in VS Code
1) Open the project folder in VS Code.
2) Press F5 to launch the Extension Development Host.
3) Confirm the start page tab appears.

## Dev Workflow Checklist
- Update `src/extension.ts` and recompile.
- If UI changes are in the webview HTML, reload the Extension Host window.
- Keep settings in sync with `package.json` configuration schema.

## Common Commands
```bash
npm run compile
npm run watch
```
