<script setup lang="ts">
import { useOverlayElements } from '../composables/useOverlayElements';

const { overlayElements } = useOverlayElements();
</script>

<template>
  <component :is="element.vnode" v-for="element in overlayElements" :key="element.key" />
</template>