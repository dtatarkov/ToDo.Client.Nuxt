<template>
  <UCard v-if="hasContent" variant="subtle" :ui="cardUIOptions">
    <template v-if="props.title" #header>
      <div class="font-semibold text-lg grow">{{ props.title }}</div>

      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </template>

    <template v-if="props.description" #default>
      <div  class="todo-card__description">{{ props.description }}</div>
    </template>    

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { useService } from '@/modules/shared/composables/useService';
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import { isEmptySlot } from '@/modules/shared/utils/isEmptySlot';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<{
  title?: string,
  description?: string,
}>(), {
  title                : '',
  description          : '',
});

const cardUIOptions = {
  root  : 'rounded-sm flex flex-col',
  header: 'flex gap-4 items-start text-primary',
  body: 'grow'
}

const stringsService = useService(StringsService);

const slots = useSlots();

const hasTitle = computed(() => !stringsService.isStringEmpty(props.title));
const hasDescription = computed(() => !stringsService.isStringEmpty(props.description));
const hasActions = computed(() => !isEmptySlot(slots.actions));
const hasFooter = computed(() => !isEmptySlot(slots.footer));

const hasContent = computed(() => 
  hasTitle.value ||
  hasDescription.value ||
  hasActions.value ||
  hasFooter.value);
</script>