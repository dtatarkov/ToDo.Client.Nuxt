<template>
    <VForm v-bind="formData" />
</template>

<script setup lang="ts">
import type { FormData } from '@/modules/forms/types/formData';
import type { ToDoData } from '../interfaces/todo';
import { FormElementType } from '@/modules/forms/enums/formElementType';
import VForm from '@/modules/forms/components/VForm.vue';

type Props = Partial<ToDoData>

const props = defineProps<Props>();

const formData: FormData<ToDoData> = shallowReactive({
    elements: {
        title: {
        type: FormElementType.inputText,
        label: 'Название задачи',
        placeholder: 'Введите название задачи',
        value: props.title,
      },

      description: {
        type: FormElementType.textarea,
        label: 'Описание задачи',
        placeholder: 'Введите описание задачи',
        value: props.description,
      },

      completionDatePlanned: {
        type: FormElementType.inputDateTime,
        label: 'Плановая дата выполнения',
        value: props.completionDatePlanned,
      }
    }
})
</script>