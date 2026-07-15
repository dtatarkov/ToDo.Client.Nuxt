<template>
  <div class="v-grid grid gap-4">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});
</script>

<style lang="scss">
.v-grid {
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
</style>
