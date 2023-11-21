/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import million from 'million/compiler'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [million.vite({ auto: true }), react()],
    test: {
        environment: 'happy-dom',
        globals: true,
        coverage: {
            reporter: ['html']
        }
    }
})
