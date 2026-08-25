<script setup lang="ts">
import { h, type VNode } from 'vue';
import { useService } from '../composables/useService';
import { OverlayViewmodel, OverlayElementType, type OverlayElementsData } from '@client/ui-overlay';
import { useViewmodel } from '../composables/useViewmodel';
import VModal from '../components/VModal.vue';

const viewmodel = useService(OverlayViewmodel);
const state = useViewmodel(viewmodel);

function getOverlayElementVNode(element: OverlayElementsData): VNode | undefined {
  switch (element.elementType) {
    case OverlayElementType.modal:
      return h(VModal, element);
      
    default:
      return undefined;
  }
}
</script>

<template>
  <component
    v-for="(element, index) in state.elements"
    :key="index"
    :is="getOverlayElementVNode(element)"
  />
</template>