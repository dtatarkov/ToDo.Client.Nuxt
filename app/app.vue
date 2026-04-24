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
import { useSharedServices } from '@/modules/shared/composables/useSharedServices';
import { useUIKitServices } from '@/modules/uikit/composables/useUIKitServices';
import { useFormsServices } from '@/modules/forms/composables/useFormsServices';
import { useOverlayServices } from '@/modules/overlay/composables/useOverlayServices';
import { useTodoServices } from '@/modules/todo/composables/useTodoServices';
import VOverlayWidget from '@/modules/overlay/widgets/VOverlayWidget.vue';

useSharedServices();
useUIKitServices();
useFormsServices();
useOverlayServices();
useTodoServices();

const config = useRuntimeConfig();
const locale = (locales as any)[config.public.locale];
</script>