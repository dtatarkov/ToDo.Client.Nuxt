<template>
  <UApp :locale="locale">
    <NuxtPage />

    <ClientOnly>
      <VOverlayWidget />
    </ClientOnly>
  </UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale';
import VOverlayWidget from '@/modules/overlay/widgets/VOverlayWidget.vue';

useAppServices();

const config = useRuntimeConfig();
const locale = (locales as any)[config.public.locale];
</script>