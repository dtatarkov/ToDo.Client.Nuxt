<script setup lang="ts">
import { Modal } from '../interfaces/modal';

const props = defineProps<{ modal: Modal }>();

function handleOpen(isOpened: boolean)
{
  if (!isOpened)
  {
    props.modal.close();
  }
}
</script>

<template>
  <UModal
      :defaultOpen="true"
      :transition="false"
      :title="modal.title"
      :description="modal.description"
      @update:open="handleOpen"
  >
    <template #content>
      <component v-if="modal.content" :is="modal.content.component" />
    </template>

    <template #footer>
      <component v-for="control in modal.controls" :key="control.key" :is="control.component" />
    </template>
  </UModal>
</template>