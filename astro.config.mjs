import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: 'https://theislecheats.cc',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    server: {
      port: 5174,
      strictPort: true,
    },
  },
})
