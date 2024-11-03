import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  // devOptions: { enabled: true },
  manifest: {
    display: "standalone",
    name: "Moving App",
    short_name: "Moving App",
    description: "I am a simple vite app",
    // icons: [{
    //   src: '/android-chrome-192x192.png',
    //   sizes: '192x192',
    //   type: 'image/png',
    //   purpose: 'favicon'
    // },
    // {
    //   src: '/android-chrome-512x512.png',
    //   sizes: '512x512',
    //   type: 'image/png',
    //   purpose: 'favicon'
    // },
    // {
    //   src: '/apple-touch-icon.png',
    //   sizes: '180x180',
    //   type: 'image/png',
    //   purpose: 'apple touch icon',
    // },
    // {
    //   src: '/maskable_icon.png',
    //   sizes: '512x512',
    //   type: 'image/png',
    //   purpose: 'any maskable',
    // }
    // ],
    // theme_color: '#ffffff',
    // background_color: '#f0e7db',
    // scope: '/',
    // start_url: "/",
    // orientation: 'portrait'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api/v1': {
        target: process.env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true,
      },
      '/auth': {
        target: process.env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})


