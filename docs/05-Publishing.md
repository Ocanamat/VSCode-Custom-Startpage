# Publishing

## Required Metadata
Update these fields in `package.json` before publishing:
- `publisher`: your Marketplace publisher ID.
- `repository`: URL to the git repo.
- `version`: bumped for each release.
- `icon`: path to a 128x128 PNG (recommended).
- `keywords`: for discoverability.

## Build and Package
```bash
npm run compile
npx @vscode/vsce package
```

## Publish
```bash
npx @vscode/vsce login ocanamat
npx @vscode/vsce publish
```

## Marketplace Page Improvements
- Add a clear description to `README.md`.
- Include screenshots in `README.md` if desired.
- Provide a clean icon image.

## Versioning
Use semantic versioning:
```bash
npm version patch
npm version minor
npm version major
```
