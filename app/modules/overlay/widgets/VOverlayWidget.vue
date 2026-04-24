<script setup lang="ts">
import { useOverlayElements } from "../composables/useOverlayElements";

const { overlayElements } = useOverlayElements();
</script>

<template>
  <component v-for="element in overlayElements" :key="element.key" :is="element.component" />
</template>