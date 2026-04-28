<script setup lang="ts">
const props = defineProps<{ 
  title: string,
  description: string,
  isDismissible: boolean,
 }>();

 const emits = defineEmits<{
   (e: 'open', isOpened: boolean): void
 }>();

 function handleOpen(isOpened: boolean) {
  emits('open', isOpened)
 }
</script>

<template>
  <UModal
      :defaultOpen="true"
      :transition="false"
      :title="props.title"
      :description="props.description"
      :dismissible="props.isDismissible"
      @update:open="handleOpen"
  >
    <template #content>
      <slot name="content" />
      
      <div class="flex gap-2 justify-end p-2" v-if="$slots.controls">
        <slot name="controls" />
      </div>
    </template>
  </UModal>
</template>