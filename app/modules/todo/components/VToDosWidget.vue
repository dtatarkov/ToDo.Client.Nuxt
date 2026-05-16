<template>
  <div class="p-4 flex flex-col gap-4">
    <VToolbar>
      <VButtonGeneral title="Добавить задание" @click="handleAddToDoButtonClick" />
    </VToolbar>

    <VGrid>
      <VToDoCard v-for="cardData in cardsData" v-bind="cardData" :key="cardData.id" />
    </VGrid>
  </div>
</template>

<script setup lang="ts">
import VToolbar from '@/modules/uikit/components/VToolbar.vue';
import VButtonGeneral from '@/modules/uikit/components/VButtonGeneral.vue';
import VGrid from '@/modules/uikit/components/VGrid.vue';
import VToDoCard from './VToDoCard.vue';
import { ShowAddToDoDialogUseCase } from '../interfaces/showAddToDoDialogUseCase';
import { useService } from '@/modules/shared/composables/useService';
import { GetToDoCardsUseCase } from '../interfaces/getToDoCardsUseCase';
import { InitializeToDosUseCase } from '../interfaces/initializeToDosUseCase';

const initializeToDosUseCase = useService(InitializeToDosUseCase);
const getToDoCardsUseCase = useService(GetToDoCardsUseCase);
const showAddToDoDialogUseCase = useService(ShowAddToDoDialogUseCase);

const cardsData = computed(() => getToDoCardsUseCase.execute());

function handleAddToDoButtonClick() {
  showAddToDoDialogUseCase.execute();
}

await initializeToDosUseCase.executeAsync();
</script>