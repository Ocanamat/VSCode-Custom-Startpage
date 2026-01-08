# Troubleshooting

## Webview Not Opening on Startup
- Ensure activation events include `onStartupFinished`.
- Confirm `customStartPage.openWhen` is set to `always` or a workspace is open.
- If the panel is already open, it will only reveal it.

## Invalid URL Error
- Check `customStartPage.url` for a valid `https://` or `http://` URL.
- The extension rejects other protocols.

## Page Does Not Load in Iframe
- The remote site may block embedding.
- Check if the URL redirects to another origin.

## CSP Errors
- CSP is strict by design. Only the configured origin is allowed in `frame-src`.
- If the page loads assets from another origin inside the iframe, the browser
  still uses the iframe origin, not the asset origin.

## TypeScript URL Error
- Ensure `tsconfig.json` includes `DOM` in `compilerOptions.lib`.
