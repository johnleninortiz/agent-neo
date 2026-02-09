# Framework-Agnostic POC Candidates

This folder groups framework POCs meant to build the same Agent Neo Web Component with different stacks and compare integration behavior in Angular (especially around pdfjs).

Top 5 candidates (with why they are strong for framework-agnostic web components):
1. Lit (small, standards-first Web Components)
2. Stencil (compiler-built Web Components with great DX)
3. Svelte (compact runtime, native custom element output)
4. Vue 3 (defineCustomElement, good ecosystem)
5. Solid (fine-grained reactivity, small runtime)

Recommended first 3 to POC:
- Lit
- Stencil
- Svelte

Each subfolder should host a minimal build that outputs a custom element bundle consumed by the Angular app.
