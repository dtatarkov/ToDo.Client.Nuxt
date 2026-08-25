<template>
  <UApp :locale="locale">
    <slot />

    <ClientOnly>
      <VOverlayWidget />
    </ClientOnly>
  </UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale';
import { VOverlayWidget } from '@client/ui-vue';

const config = useRuntimeConfig();
const locale = (locales as any)[config.public.locale];
</script>