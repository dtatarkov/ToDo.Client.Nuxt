<template>
  <VHeader :title="config.public.appTitle">
    <template #right>
      <VSidebarTimelineButtonWidget />
    </template>
  </VHeader>
</template>

<script setup lang="ts">
import VHeader from '@/modules/uikit/components/VHeader.vue';
import VSidebarTimelineButtonWidget from '@/modules/sidebar/components/VSidebarTimelineButtonWidget.vue';

const config = useRuntimeConfig();
</script>