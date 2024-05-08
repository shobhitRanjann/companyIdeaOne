import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Server } from 'lucide-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

