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
      :default-open="true"
      :transition="false"
      :description="props.description"
      :dismissible="props.isDismissible"
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