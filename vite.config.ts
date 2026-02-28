import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const isStandalone = process.env.STANDALONE === 'true';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AgentNeo',
      fileName: isStandalone ? 'agent-neo.standalone' : 'agent-neo',
      formats: ['es'],
    },
    rollupOptions: {
      /**
       * IMPORTANT: Standalone build vs. Standard build
       * 
       * 1. Standard build (agent-neo.js): Externalizes React/React-DOM. The host project 
       *    MUST provide these as dependencies (e.g., in a React app).
       * 
       * 2. Standalone build (agent-neo.standalone.js): Bundles React/React-DOM internally.
       *    This allows the component to work as a self-contained Web Component in 
       *    non-React environments (Angular, Vue, Vanilla JS) without adding React 
       *    to the host project's dependencies.
       */
      // Externalize peers in standard build, bundle them in standalone, prefer standalone if possible
      external: isStandalone ? [] : [
        /^react/,
        /^react-dom/
      ],
      output: {
        globals: {},
      },
    },
  },
});
