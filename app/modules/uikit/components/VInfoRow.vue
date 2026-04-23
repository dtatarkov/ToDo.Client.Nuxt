<template>
  <div class="flex justify-between items-center gap-2 text-sm">
    <span class="min-w-[100px]">{{ label }}</span>
    
    <span>
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  }
});
</script>