<script lang="ts" setup>
import VGrid from '@/modules/uikit/components/VGrid.vue';
import VToDoCard from './VToDoCard.vue';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';

type VToDosWidgetProps = {
  cards?: ToDoCardDataWithIdentity[];
};

type VToDosWidgetEmits = {
  (e: 'editToDo', card: ToDoCardDataWithIdentity): void;
};

const props = withDefaults(defineProps<VToDosWidgetProps>(), {
  cards: () => new Array<ToDoCardDataWithIdentity>()
});

defineEmits<VToDosWidgetEmits>();
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <slot name="toolbar" />

    <VGrid>
      <VToDoCard
        v-for="card in props.cards"
        :key="card.id"
        v-bind="card"
        @edit="$emit('editToDo', card)"
      />
    </VGrid>
  </div>
</template>