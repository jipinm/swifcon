import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/swifcon/',
  plugins: [react()],
  // Fix asset paths for build
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
