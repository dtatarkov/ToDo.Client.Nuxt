<script setup lang="ts">
import { computed } from 'vue';
import { Sidebar } from '../entities/sidebar';
import { useObservableReadonly } from '@client/ui-vue';

const sidebar = useService(Sidebar);

const content = useObservableReadonly(sidebar.content);
const hasContent = computed(() => content.value !== undefined);
</script>

<template>
  <USidebar
    v-if="hasContent"
    side="right"
    :ui="{ root: 'contain-[paint]', container: 'h-full relative w-[300px]' }"
  >
    <component :is="content?.vnode" />
  </USidebar>
</template>