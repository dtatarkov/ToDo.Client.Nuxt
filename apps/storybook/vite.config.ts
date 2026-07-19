import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import swc from "@o.z/vite-plugin-swc";
import ui from '@nuxt/ui/vite';
import nuxtUIConfig from '@client/infrastructure-nuxt-ui/config';

export default defineConfig({
  plugins: [
    vue(),
    swc(),

    ui({
      ui: nuxtUIConfig
    })
  ],
});
