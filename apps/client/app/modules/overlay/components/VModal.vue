<script setup lang="ts">
import type { ModalData } from '../types/modalData';
import type { ModalState } from '../types/modalState';

const props = defineProps<ModalData & ModalState>();

 const emits = defineEmits<{
   (e: 'close'): void
 }>();

 const isDismissible = computed(() => !props.isDisabled);

 function handleOpen(isOpened: boolean) {
  if(!isOpened) 
  {
    emits('close');
  }
 }
</script>

<template>
  <UModal
      :default-open="true"
      :transition="false"
      :description="props.description"
      :dismissible="isDismissible"
      @update:open="handleOpen"
  >
    <template #title>
      {{ props.title }}
    </template>

    <template #body>
      <slot name="content" />
      
      <div v-if="$slots.controls" class="flex gap-2 justify-end pt-2">
        <slot name="controls" />
      </div>
    </template>
  </UModal>
</template>