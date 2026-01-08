# Future Features

## Ideas
- Security audit of the webview and iframe restrictions.
- Improve Marketplace listing (description, screenshots, icon).
- Change tab title to the remote page title after load.

## Notes for Implementation
- To update the tab title, send the page title from the iframe to the
  extension via `postMessage`, then set `panel.title`.
- For stricter navigation, add explicit allowlist checks and reject redirects
  that change the origin.
- Add settings for default title, workspace-specific URL, or a URL allowlist.
