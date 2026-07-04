<template>
  <section v-if="shouldBeRendered" class="flex flex-col gap-2 divide-y mt-1">
    <section
      v-for="(element, index) in elements"
      :key="index"
      class="border-default pb-2"
    >
      <slot :element="element" />
    </section>
  </section>
</template>

<script setup lang="ts" generic="T">
import { isEmptySlot } from '@/modules/shared/utils/isEmptySlot';

type Props<T> = {
  elements: readonly T[];
}

const props = defineProps<Props<T>>();

const slots = useSlots();

const hasElements = computed(() => props.elements.length > 0);
const hasContentSlot = computed(() => !isEmptySlot(slots.default));
const shouldBeRendered = computed(() => hasElements.value && hasContentSlot.value);
</script>
