<script setup lang="ts">
import { useService } from '@/modules/shared/composables/useService';
import { GetOverlayElementsUseCase } from '../usecases/getOverlayElementsUseCase';

const getOverlayElementsUseCase = useService(GetOverlayElementsUseCase);
const overlayElements = getOverlayElementsUseCase.execute();
</script>

<template>
  <component :is="element.component" v-for="element in overlayElements" :key="element.key" />
</template>