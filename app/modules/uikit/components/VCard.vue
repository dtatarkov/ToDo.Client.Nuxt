<template>
  <UCard variant="subtle" :ui="cardUIOptions">
    <template #header>
      <div class="font-semibold text-lg grow">{{ props.title }}</div>

      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </template>

    <template v-if="props.description" #default>
      <div  class="todo-card__description">{{ props.description }}</div>
    </template>    

    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string,
  description?: string,
}>(), {
  title                : '',
  description          : '',
});

const cardUIOptions = {
  root  : 'rounded-sm',
  header: 'flex gap-4 items-center text-primary'
}
</script>