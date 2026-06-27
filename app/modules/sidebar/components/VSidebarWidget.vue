<script setup lang="ts">
import { computed } from 'vue';
import { useService } from '@/modules/shared/composables/useService';
import { Sidebar } from '../entities/sidebar';
import { useObservableReadonly } from '@/modules/shared/composables/useObservableReadonly';

const sidebar = useService(Sidebar);

const content = useObservableReadonly(sidebar.content);
const hasContent = computed(() => content.value !== undefined);
</script>

<template>
  <USidebar
    v-if="hasContent"
    side="right"
    :ui="{ root: 'contain-[paint]', container: 'h-full relative' }"
  >
    <component :is="content?.vnode" />
  </USidebar>
</template>