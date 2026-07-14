<template>
  <div class="flex flex-col gap-2">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});
</script>
