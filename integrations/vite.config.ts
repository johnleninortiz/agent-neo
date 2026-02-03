import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    server: {
        port: 4014,
        proxy: {
            '/gemini-api': {
                target: 'https://generativelanguage.googleapis.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/gemini-api/, ''),
            },
            '/claude-api': {
                target: 'https://api.anthropic.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/claude-api/, ''),
            }
        }
    }
});
