<script lang="ts" setup>
import { useService } from '@/modules/shared/composables/useService';
import { ToDosService } from '../interfaces/todosService';
import { ToDoViewmodelsFactory } from '../interfaces/todoViewmodelsFactory';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';

const todosService = useService(ToDosService);
const todoViewmodelsFactory = useService(ToDoViewmodelsFactory);
const uikitViewmodelsFactory = useService(UIKitViewmodelsFactory);

const todos = await todosService.getAllToDosAsync();
const cards = new ObservableComputed(() => todos.value.map(todo => todoViewmodelsFactory.createToDoCard(todo)));
const grid = uikitViewmodelsFactory.createGrid(cards);
</script>

<template>
  <div class="p-4">
    <component :is="grid.component" />
  </div>
</template>