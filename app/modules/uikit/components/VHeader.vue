<template>
  <UHeader :title="title" />
</template>

<script setup lang="ts">
type Props = {
  title: string;
};

defineProps<Props>();
</script>