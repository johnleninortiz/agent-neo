# Stencil POC

Build a custom element with Stencil.

Commands:
- `npm install`
- `npm run build`

Output:
- `dist/` (loader + component builds)
- `dist-custom-elements/` (custom elements bundle)

Integration test in Angular:
- Use the custom elements output bundle from `dist-custom-elements/`.
- Register the loader if you use the `dist/` build.
