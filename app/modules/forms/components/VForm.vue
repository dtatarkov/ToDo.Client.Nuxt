<script setup lang="ts">
import VInputText from '@/modules/uikit/components/VInputText.vue';
import { FormElementType } from '../enums/formElementType';
import type { FormData } from '../types/formData';
import type { FormElementCreateData } from '../types/formElementCreateData';
import VFormField from './VFormField.vue';
import VInputTextarea from '@/modules/uikit/components/VInputTextarea.vue';
import VInputTime from '@/modules/uikit/components/VInputTime.vue';
import VInputDate from '@/modules/uikit/components/VInputDate.vue';
import VInputDateTime from '@/modules/uikit/components/VInputDateTime.vue';

type Emits = {
  (e: 'submit'): void;
}

const props = defineProps<FormData>();
const emits = defineEmits<Emits>();

function getInputComponent(element: FormElementCreateData)
{
  switch (element.type)
  {
    case FormElementType.inputText: return h(VInputText, element);
    case FormElementType.textarea: return h(VInputTextarea, element);
    case FormElementType.inputTime: return h(VInputTime, element);
    case FormElementType.inputDate: return h(VInputDate, element);
    case FormElementType.inputDateTime: return h(VInputDateTime, element);
  }
}
</script>

<template>
  <UForm class="p-4 flex flex-col gap-4" :disabled="props.isDisabled" @submit="emits('submit')">
    <template v-for="(element, name) in props.elements" :key="name">
      <VFormField v-if="element" :name="name" :label="element.label">
        <component :is="getInputComponent(element)" class="w-full" />
      </VFormField>
    </template>
  </UForm>
</template>