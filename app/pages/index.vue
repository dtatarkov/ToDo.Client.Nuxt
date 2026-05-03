<template>
  <component :is="todosWidget.component" />  
</template>

<script setup lang="ts">
import { useService } from '@/modules/shared/composables/useService';
import { ToDosWidgetViewmodel } from '@/modules/todo/interfaces/todosWidgetViewmodel';

const todosWidget = useService(ToDosWidgetViewmodel);
</script>