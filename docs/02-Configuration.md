# Configuration

## Settings
- `customStartPage.url`: Remote URL to load in the webview.
- `customStartPage.openWhen`: `always` or `workspace`.

## Example (User Settings)
```json
{
  "customStartPage.url": "https://example.com/start",
  "customStartPage.openWhen": "always",
  "workbench.startupEditor": "none"
}
```

## Behavior Notes
- `openWhen=always` opens the tab for every window.
- `openWhen=workspace` opens only when a workspace folder exists.
- The `workbench.startupEditor` setting is optional and only affects the
  built-in Welcome editor.
