# Release Checklist

## Development Checklist
- Update code and run `npm run compile`.
- Verify the webview opens on startup.
- Confirm settings behavior (`always` vs `workspace`).

## Docs and Metadata Checklist
- Update `README.md` if behavior changed.
- Ensure `LICENSE.txt` exists.
- Confirm `publisher`, `repository`, and `version` in `package.json`.
- Add or update `icon` and `keywords` if needed.

## Git Checklist
- `git status` shows expected changes only.
- `git add -A`
- `git commit -m "Release vX.Y.Z"`
- Push to remote from VS Code or terminal.

## Packaging Checklist
- `npx @vscode/vsce package`
- Validate the `.vsix` installs and opens the start page.

## Publish Checklist
- `npx @vscode/vsce login ocanamat`
- `npx @vscode/vsce publish`
