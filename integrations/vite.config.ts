import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: './',
    resolve: {
        alias: {
            // Map /dist to the actual project-level dist folder
            '/dist': path.resolve(__dirname, '../dist')
        }
    },
    server: {
        port: 4014,
        fs: {
            // Allow serving files from the project root (one level up)
            allow: ['..']
        },
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
