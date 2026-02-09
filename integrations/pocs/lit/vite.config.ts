import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AgentNeo',
      fileName: 'agent-neo',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  },
  plugins: [
    dts({
      tsconfigPath: 'tsconfig.json',
      insertTypesEntry: true
    })
  ]
});
