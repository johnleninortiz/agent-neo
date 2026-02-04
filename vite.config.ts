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
      // Externalize peers in standard build, bundle them in standalone
      // Use regex to catch sub-paths like react/jsx-runtime
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
