<script setup lang="ts" generic="K extends string = string">
import { FormElementType, type FormElementData } from '@client/ui-forms';
import VFormField from './VFormField.vue';
import { h } from 'vue';
import VInputText from './VInputText.vue';
import VInputTextarea from './VInputTextarea.vue';
import { VInputDate, VInputTime } from '@client/ui-vue';
import VInputDateTime from './VInputDateTime.vue';
import { UnknownFormElementTypeException } from '../exceptions/unknownFormElementTypeException';
import type { FormProps } from '../types/formProps';

type Emits = {
  (e: 'submit'): void;
}

const props = withDefaults(defineProps<FormProps<K>>(), { 
  isDisabled: false,
});

const emits = defineEmits<Emits>();

function getFormElementInput(elementData: FormElementData)
{
  switch (elementData.type) {
    case FormElementType.inputText: return h(VInputText, elementData);
    case FormElementType.inputTextarea: return h(VInputTextarea, elementData);
    case FormElementType.inputDate: return h(VInputDate, elementData);
    case FormElementType.inputTime:return h(VInputTime, elementData);
    case FormElementType.inputDateTime:return h(VInputDateTime, elementData);
    default:
      throw new UnknownFormElementTypeException((elementData as FormElementData).type);
  }
}
</script>

<template>
  <UForm class="flex flex-col gap-2" :disabled="props.isDisabled" @submit="emits('submit')">
    <VFormField 
      v-for="elementData of elements as Record<string, FormElementData>" 
      v-bind="elementData" 
    >
      <component :is="getFormElementInput(elementData)" />
    </VFormField>
  </UForm>
</template>