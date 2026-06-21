<template>
  <VHeader :title="config.public.appTitle" />
</template>

<script setup lang="ts">
import VHeader from '@/modules/uikit/components/VHeader.vue';

const config = useRuntimeConfig();
</script>