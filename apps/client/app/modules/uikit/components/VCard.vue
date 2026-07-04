<template>
  <UCard v-if="hasContent" variant="subtle" :ui="cardUIOptions">
    <template v-if="hasHeader" #header>
      <div class="font-semibold text-lg grow">{{ props.title }}</div>

      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </template>

    <template #default>
      <div class="todo-card__description">{{ props.description }}</div>
    </template>    

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { isEmptySlot } from '@/modules/shared/utils/isEmptySlot';
import type { CardData } from '../types/cardData';
import { isStringEmpty } from '@/modules/shared/utils/isStringEmpty';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<CardData>(), {
  title                : '',
  description          : '',
});

const cardUIOptions = {
  root  : 'rounded-sm flex flex-col',
  header: 'flex gap-4 items-start text-primary',
  body: 'grow'
}

const slots = useSlots();

const hasTitle = computed(() => !isStringEmpty(props.title));
const hasDescription = computed(() => !isStringEmpty(props.description));
const hasActions = computed(() => !isEmptySlot(slots.actions));
const hasFooter = computed(() => !isEmptySlot(slots.footer));

const hasHeader = computed(() => !isStringEmpty(props.title) || hasActions.value);

const hasContent = computed(() => 
  hasTitle.value ||
  hasDescription.value ||
  hasActions.value ||
  hasFooter.value);
</script>