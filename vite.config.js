import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'

=======
// https://vite.dev/config/
>>>>>>> e30f51b4e5c1b6c8f777afb9b48fe6e57b7c644c
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
<<<<<<< HEAD
    tailwindcss(),
  ],

=======
  ],
>>>>>>> e30f51b4e5c1b6c8f777afb9b48fe6e57b7c644c
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
