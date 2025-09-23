import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 12000,
    allowedHosts: true,
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      '@react-three/fiber', 
      '@react-three/drei', 
      'three',
      'framer-motion',
      'react-router-dom'
    ],
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          'framer-motion': ['framer-motion'],
          'ui': ['@radix-ui/react-label', '@radix-ui/react-switch', '@radix-ui/react-toast'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
