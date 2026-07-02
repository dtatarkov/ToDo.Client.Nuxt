<template>
  <section class="flex gap-2 cursor-pointer hover:text-primary select-none">
    <span class="text-xs">{{ props.text }}</span>
    <VBadge>{{ props.count }}</VBadge>
  </section>
</template>

<script setup lang="ts">
import VBadge from './VBadge.vue';

type Props = {
  text: string;
  count: number;
}

const props = defineProps<Props>();
</script>
