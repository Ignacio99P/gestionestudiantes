import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
      "/api": "http://127.0.0.1:5173", //ip de cada uno
    }
  },
  plugins: [react()],
})
