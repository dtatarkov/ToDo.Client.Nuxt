<script lang="ts" setup>
import VGrid from '@/modules/uikit/components/VGrid.vue';
import VButtonGeneral from '@/modules/uikit/components/VButtonGeneral.vue';
import VToDoCard from './VToDoCard.vue';
import VToolbar from '@/modules/uikit/components/VToolbar.vue';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';

type VToDosWidgetProps = {
  cards?: ToDoCardDataWithIdentity[];
};

type VToDosWidgetEmits = {
  (e: 'addToDo'): void;
  (e: 'editToDo', card: ToDoCardDataWithIdentity): void;
};

const props = withDefaults(defineProps<VToDosWidgetProps>(), {
  cards: () => new Array<ToDoCardDataWithIdentity>(),
  initialize: undefined,
});

defineEmits<VToDosWidgetEmits>();
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <VToolbar>
      <VButtonGeneral
        title="Добавить задание"
        @click="$emit('addToDo')"
      />
    </VToolbar>

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