import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    server: {
      proxy: {
        '/api/torre': {
          target: 'https://torre.ai',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/torre/, ''),
        },
      },
    },
  },
});
