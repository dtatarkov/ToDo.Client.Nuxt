<template>
  <div class="p-4 flex flex-col gap-4">
    <VToolbar>
      <VButtonGeneral title="Добавить задание" @click="handleAddToDoButtonClick" />
    </VToolbar>

    <VGrid>
      <VToDoCard v-for="card in todoCards" v-bind="card" :key="card.id" @edit="handleEditToDoRequest(card.id)" />
    </VGrid>
  </div>
</template>

<script setup lang="ts">
import VToolbar from '../components/VToolbar.vue';
import VButtonGeneral from '../components/VButtonGeneral.vue';
import VGrid from '../components/VGrid.vue';
import { useToDoCards } from '../composables/useToDoCards';

const { todoCards, initializeToDosAsync, createToDo, editToDo } = useToDoCards();

function handleAddToDoButtonClick() {
  createToDo();
}

function handleEditToDoRequest(id: string) {
  editToDo(id);
}

await initializeToDosAsync();
</script>