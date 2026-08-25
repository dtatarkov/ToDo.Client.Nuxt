<template>
  <VAppWidget>
    <VHeaderWidget />

    <section class="flex">
      <VMain class="grow">
        <NuxtPage />
      </VMain>
    </section>

    <VFooter />
  </VAppWidget>
</template>

<script setup lang="ts">
import VAppWidget from '@/modules/uikit/components/VAppWidget.vue';
import VHeaderWidget from '@/modules/layouts/components/VHeaderWidget.vue';
import VFooter from '@/modules/uikit/components/VFooter.vue';
import VMain from '@/modules/uikit/components/VMain.vue';

useAppServices();
useGlobalErrorsHandler();
</script>