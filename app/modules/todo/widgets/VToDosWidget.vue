<script lang="ts" setup>
import VGrid from '@/modules/uikit/components/VGrid.vue';
import VButtonGeneral from '@/modules/uikit/components/VButtonGeneral.vue';
import VToDoCard from './VToDoCard.vue';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';
import type { Func } from '@/modules/shared/types/func';

type VToDosWidgetProps = {
  cards?: ToDoCardDataWithIdentity[];
  initialize?: Func<Promise<void>>;
};

type VToDosWidgetEmits = {
  (e: 'addToDo'): void;
  (e: 'editToDo', card: ToDoCardDataWithIdentity): void;
};

const props = withDefaults(defineProps<VToDosWidgetProps>(), {
  cards: () => new Array<ToDoCardDataWithIdentity>(),
});

defineEmits<VToDosWidgetEmits>();

if(props.initialize) 
{
  await props.initialize();
}
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