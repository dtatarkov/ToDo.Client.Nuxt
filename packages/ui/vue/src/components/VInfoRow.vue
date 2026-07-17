<template>
  <div class="flex justify-between items-center gap-2 text-sm items-start">
    <span class="min-w-[100px]">{{ props.label }}</span>
    
    <span>
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
type Props = {
  label: string;
}

defineOptions({
  inheritAttrs: false
});

const props = defineProps<Props>();
</script>
