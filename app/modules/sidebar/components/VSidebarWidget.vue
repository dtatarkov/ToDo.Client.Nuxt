<script setup lang="ts">
import { computed } from 'vue';
import { useService } from '@/modules/shared/composables/useService';
import { Sidebar } from '../entities/sidebar';
import { useEventDrivenRef } from '@/modules/shared/composables/useEventDrivenRef';

const sidebar = useService(Sidebar);

const content = useEventDrivenRef({
    getter: () => sidebar.content,
    on: (callback, disposeToken) => sidebar.onContentChange(callback, disposeToken)
});

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