<template>
  <div class="p-4 flex flex-col gap-4">
    <VToolbar>
      <VButtonGeneral title="Добавить задание" @click="handleAddToDoButtonClick" />
    </VToolbar>

    <VGrid>
      <VToDoCard v-for="cardData in cardsData" v-bind="cardData" :key="cardData.id" @edit="handleEditToDoRequest(cardData.id)" />
    </VGrid>
  </div>
</template>

<script setup lang="ts">
import VToolbar from '@/modules/uikit/components/VToolbar.vue';
import VButtonGeneral from '@/modules/uikit/components/VButtonGeneral.vue';
import VGrid from '@/modules/uikit/components/VGrid.vue';
import VToDoCard from './VToDoCard.vue';
import { useService } from '@/modules/shared/composables/useService';
import { GetToDoCardsUseCase } from '../usecases/getToDoCardsUseCase';
import { InitializeToDosUseCase } from '../usecases/initializeToDosUseCase';
import { CreateToDoUseCase } from '../usecases/createToDoUseCase';
import { EditToDoUseCase } from '../usecases/editToDoUseCase';

const initializeToDosUseCase = useService(InitializeToDosUseCase);
const getToDoCardsUseCase = useService(GetToDoCardsUseCase);
const showAddToDoDialogUseCase = useService(CreateToDoUseCase);
const showEditToDoDialogUseCase = useService(EditToDoUseCase);

const cardsData = getToDoCardsUseCase.execute();

function handleAddToDoButtonClick() {
  showAddToDoDialogUseCase.execute();
}

function handleEditToDoRequest(id: string) {
    showEditToDoDialogUseCase.executeAsync(id);
}

await initializeToDosUseCase.executeAsync();
</script>