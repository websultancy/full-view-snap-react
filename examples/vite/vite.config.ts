import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from 'path';
console.log(path.resolve(__dirname, '../../src'));
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true, // This exposes the dev server on your local network IP
    watch: {
      // Watch for changes in the yalc package
      ignored: ['!**/node_modules/full-view-snap-react/**'],
    },
    fs: {
      // Allow serving files from the yalc package
      allow: ['..'],
    },
  },
  optimizeDeps: {
    // Force Vite to re-bundle the yalc package when it changes
    include: ['full-view-snap-react'],
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  base: '/vite/', // <-- Set this if your app is served from /vite/
})
