import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base para GitHub Pages: asegúrate que el repo se llama 'invitacion-alejandra'
export default defineConfig({
  base: '/invitacion-alejandra/',
  plugins: [react()],
})
