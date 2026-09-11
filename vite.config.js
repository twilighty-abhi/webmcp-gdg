import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// COOP/COEP makes localhost origin-isolated, required by current WebMCP builds.
export default defineConfig({
  server: { headers: { 'Cross-Origin-Opener-Policy': 'same-origin', 'Cross-Origin-Embedder-Policy': 'require-corp' } },
  preview: { headers: { 'Cross-Origin-Opener-Policy': 'same-origin', 'Cross-Origin-Embedder-Policy': 'require-corp' } },
  build: { rollupOptions: { input: [
    'index.html', 'demos/webmcp-demo/index.html',
    'tracks/events/index.html', 'tracks/ecommerce/index.html', 'tracks/travel/index.html', 'tracks/restaurants/index.html', 'tracks/tasks/index.html', 'tracks/courses/index.html', 'tracks/movies/index.html',
    'checkpoints/01-first-tool/index.html', 'checkpoints/02-multiple-tools/index.html', 'checkpoints/03-final-example/index.html'
  ].map(file => resolve(file)) } }
});
