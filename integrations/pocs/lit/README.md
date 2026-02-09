# Lit POC

Build a standard Web Component with minimal runtime.

Commands:
- `npm install`
- `npm run build`

Output:
- `dist/agent-neo.es.js`
- `dist/agent-neo.umd.js`

Integration test in Angular:
- Load the `es` bundle via script tag or bundler.
- Use `<agent-neo [config]="..." [user]="..." ...>` in a template.
