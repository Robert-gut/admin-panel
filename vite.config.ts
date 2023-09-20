import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Змініть host на '0.0.0.0'
    port: 5173, // Змініть на потрібний вам порт
  },
})
