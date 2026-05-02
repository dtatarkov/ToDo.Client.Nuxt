<script lang="ts" setup>
import { useService } from '@/modules/shared/composables/useService';
import { ToDosService } from '../interfaces/todosService';
import { ToDoViewmodelsFactory } from '../interfaces/todoViewmodelsFactory';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';

const todosService = useService(ToDosService);
const todoViewmodelsFactory = useService(ToDoViewmodelsFactory);
const uikitFactory = useService(UIKitViewmodelsFactory);

const todos = await todosService.getAllToDosAsync();
const cards = new ObservableComputed(() => todos.value.map(todo => todoViewmodelsFactory.createToDoCard(todo)));
const grid = uikitFactory.createGrid(cards);

const toolbar = uikitFactory.createToolbar();

const addToDoButton = uikitFactory.createButtonGeneral({ 
  title: 'Добавить задание',
  click: handleAddToDoButtonClick 
});

toolbar.addElement(addToDoButton);

function handleAddToDoButtonClick() {
  todosService.showAddToDoDialog();
}
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <component :is="toolbar.component" />
    <component :is="grid.component" />
  </div>
</template>