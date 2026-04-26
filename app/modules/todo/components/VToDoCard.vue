<template>
  <UCard class="todo-card" variant="subtle" :ui="cardUIOptions">
    <template #header>
      <div class="todo-card__title font-semibold text-lg grow">{{ props.title }}</div>

      <div class="todo-card__actions">
        <UButton
            class="cursor-pointer"
            variant="link"
            color="secondary"
            icon="i-heroicons-pencil-square"
            size="sm"
            @click="() => emits('edit-button-click')"
        />
      </div>
    </template>

    <div class="todo-card__description">{{ props.description }}</div>

    <template #footer v-if="hasFooter">
      <component :is="infoBlock.component" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { useService } from '@/modules/shared/composables/useService';
import { UIKitElementsFactory } from '@/modules/uikit/interfaces/uiKitElementsFactory';

const uikitElementsFactory = useService(UIKitElementsFactory);

const emits = defineEmits<{
  (e: 'edit-button-click'): void
}>();

const props = withDefaults(defineProps<{
  title?: string,
  description?: string,
  completionDateActual?: string,
  completionDatePlanned?: string,
}>(), {
  title                : '',
  description          : '',
  completionDateActual : '',
  completionDatePlanned: ''
});

const cardUIOptions = {
  root  : 'rounded-sm',
  header: 'flex gap-4 items-center text-primary'
}

const infoBlock = uikitElementsFactory.createInfoBlock();
const completionDateActualRow = infoBlock.createRow({ label: 'Выполнено' });
const completionDatePlannedRow = infoBlock.createRow({ label: 'Выполнить до'});

const hasFooter = computed(() => props.completionDateActual.length > 0 || props.completionDatePlanned.length > 0);

watchEffect(() => {
  completionDateActualRow.content = props.completionDateActual;
});

watchEffect(() => {
  completionDatePlannedRow.content = props.completionDatePlanned;
});
</script>