<template>
  <UCard v-if="hasContent" variant="subtle" :ui="cardUIOptions">
    <slot />
  </UCard>
</template>

<script setup lang="ts">
import { isEmptySlot } from '@client/ui-vue';
import { computed } from 'vue';

const cardUIOptions = {
  root  : 'rounded-sm',
  body  : 'flex justify-end p-2 sm:p-2 gap-2'
}

defineOptions({
  inheritAttrs: false
});

const slots = useSlots();
const hasContent = computed(() => !isEmptySlot(slots.default));
</script>