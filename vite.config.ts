import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'MLVisuals',
          fileName: 'index',
          formats: ['es'],
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    }
  }
  return {
    root: 'examples',
    plugins: [react()],
    server: { open: true },
  }
})
