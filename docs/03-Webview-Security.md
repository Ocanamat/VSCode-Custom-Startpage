# Webview Security

## Current Protections
- CSP blocks all sources by default.
- `frame-src` allows only the configured origin.
- Scripts and styles are limited to a generated nonce.
- Iframe uses a sandbox with `allow-scripts`, `allow-forms`, and
  `allow-same-origin`.

## Why It Matters
Webviews run inside VS Code. A strict CSP reduces the risk of unwanted
navigation, script injection, or loading from untrusted domains.

## Embedding Limitations
- The remote site must allow iframe embedding.
- If the site uses `X-Frame-Options` or `frame-ancestors` to block embedding,
  the page will not load.
- If the URL redirects to a different origin, CSP will block the iframe.

## Restricting Navigation
The webview only allows the configured origin. To allow multiple origins,
update the CSP `frame-src` list and add validation to `sanitizeUrl`.
