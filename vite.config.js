import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';
// ─────────────────────────────────────────
//  Base path detection
// ─────────────────────────────────────────
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const base = isGitHubPages ? '/bizcalc/' : '/';
export default defineConfig({
    base,
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            base,
            includeAssets: ['icons/*.png'],
            manifest: {
                name: 'BizCalc',
                short_name: 'BizCalc',
                description: 'Production & Sales Calculator for any business',
                theme_color: '#00b894',
                background_color: '#f5f6fa',
                display: 'standalone',
                start_url: isGitHubPages ? '/bizcalc/' : '/',
                scope: isGitHubPages ? '/bizcalc/' : '/',
                icons: [
                    {
                        src: isGitHubPages
                            ? '/bizcalc/icons/icon-192.png'
                            : '/icons/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: isGitHubPages
                            ? '/bizcalc/icons/icon-512.png'
                            : '/icons/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
                // ── Make sure service worker scope matches base ──
                navigateFallback: 'index.html',
                navigateFallbackDenylist: [/^\/api/],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        headers: {
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Embedder-Policy': 'require-corp',
        },
    },
    optimizeDeps: {
        exclude: ['@sqlite.org/sqlite-wasm'],
    },
});
