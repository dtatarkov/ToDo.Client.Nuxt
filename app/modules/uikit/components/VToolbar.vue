<template>
  <UCard v-if="hasContent" variant="subtle" :ui="cardUIOptions">
    <slot />
  </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isEmptySlot } from '@/modules/shared/utils/isEmptySlot';

const cardUIOptions = {
  root  : 'rounded-sm',
  body  : 'flex justify-end p-2 sm:p-2 gap-2'
}

const slots = useSlots();
const hasContent = computed(() => !isEmptySlot(slots.default));
</script>