<script setup lang="ts">
import { OverlayService } from '../services/overlayService';
import { useService } from '@/modules/shared/composables/useService';

const overlayService = useService(OverlayService);
const overlayElements = overlayService.getElements();
</script>

<template>
  <component :is="element.component" v-for="element in overlayElements" :key="element.key" />
</template>