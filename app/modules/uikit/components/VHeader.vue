<template>
  <UHeader :title="title">
    <template #right>
      <slot name="right" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};

defineProps<Props>();
</script>