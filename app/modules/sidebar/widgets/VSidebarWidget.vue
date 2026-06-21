<script setup lang="ts">
import { computed } from 'vue';
import { useService } from '@/modules/shared/composables/useService';
import { Sidebar } from '../entities/sidebar';
import { useEventDrivenRef } from '@/modules/shared/composables/useEventDrivenRef';

const sidebar = useService(Sidebar);
const sidebarLayers = Object.values(sidebar.layers);

const activeLayer = useEventDrivenRef({
    getter: () => sidebarLayers.find(layer => layer.isActive),
    on: (callback, disposeToken) => sidebar.onLayersChange(callback, disposeToken)
});

const hasActiveLayer = computed(() => activeLayer.value !== undefined);
</script>

<template>
  <USidebar
    v-if="hasActiveLayer"
    side="right"
    :ui="{ root: 'contain-[paint]', container: 'h-full relative' }"
  >
    <component :is="activeLayer?.vnode" />
  </USidebar>
</template>