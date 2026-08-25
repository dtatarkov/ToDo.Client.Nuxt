<template>
  <div class="p-4 flex flex-col gap-4">
    <VToolbar>
      <VButtonGeneral v-bind="state.addToDoButton" @click="viewmodel.createToDo()" />
    </VToolbar>

    <VGrid>
      <VToDoCard v-for="card in state.cards" v-bind="card" :key="card.id" @edit="viewmodel.editToDo(card.id)" />
    </VGrid>
  </div>
</template>

<script setup lang="ts">
import VToolbar from '../components/VToolbar.vue';
import VButtonGeneral from '../components/VButtonGeneral.vue';
import VGrid from '../components/VGrid.vue';
import VToDoCard from '../components/VToDoCard.vue';
import { ToDosWidgetViewmodel } from '@client/ui-todo';
import { useService } from '../composables/useService';
import { useViewmodel } from '../composables/useViewmodel';

const viewmodel = useService(ToDosWidgetViewmodel);
const state = useViewmodel(viewmodel);

await viewmodel.initializeAsync();
</script>