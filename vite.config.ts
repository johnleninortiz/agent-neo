import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

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
      fileName: 'agent-neo',
      formats: ['es'],
    },
    rollupOptions: {
      // Bundle React and ReactDOM for standalone usage
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
