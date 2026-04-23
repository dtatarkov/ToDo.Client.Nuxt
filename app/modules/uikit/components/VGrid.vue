<template>
  <div class="v-grid grid gap-4">
    <slot />
  </div>
</template>

<style lang="scss">
.v-grid {
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
</style>