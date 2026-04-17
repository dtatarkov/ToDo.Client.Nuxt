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
      <VInfoBlock>
        <VInfoRow label="Выполнено" v-if="props.completionDateActual.length">
          <VDate :date="props.completionDateActual" />
        </VInfoRow>

        <VInfoRow label="Выполнить до" v-else-if="props.completionDatePlanned.length">
          <VDate :date="props.completionDatePlanned" />
        </VInfoRow>
      </VInfoBlock>
    </template>
  </UCard>
</template>

<script setup lang="ts">
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

const hasFooter = computed(() => props.completionDateActual.length > 0 || props.completionDatePlanned.length > 0);
</script>