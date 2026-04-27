<script lang="ts" setup>
import { useService } from '@/modules/shared/composables/useService';
import { ToDosService } from '../interfaces/todosService';
import { ToDoElementsFactory } from '../interfaces/todoElementsFactory';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';

const todosService = useService(ToDosService);
const todoElementsFactory = useService(ToDoElementsFactory);
const uikitElementsFactory = useService(UIKitViewmodelsFactory);

const todos = await todosService.getAllToDosAsync();
const cards = new ObservableComputed(() => todos.value.map(todo => todoElementsFactory.createToDoCard(todo)));
const grid = uikitElementsFactory.createGrid(cards);
</script>

<template>
  <div class="p-4">
    <component :is="grid.component" />
  </div>
</template>