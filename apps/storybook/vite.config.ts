import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ui from '@nuxt/ui/vite';
import nuxtUIConfig from '@client/infrastructure-nuxt-ui/config';

export default defineConfig({
  plugins: [
    vue(),

    ui({
      ui: nuxtUIConfig
    })
  ],
});
