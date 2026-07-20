<script setup lang="ts" generic="K extends string = string">
import { FormElementType, type FormElementData } from '@client/ui-core';
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

function getFormElementInput(elementName: K, elementData: FormElementData)
{
  const value = props.data?.[elementName];

  const inputProps = {
    ...elementData,

    value
  }

  switch (elementData.type) {
    case FormElementType.inputText: return h(VInputText, inputProps);
    case FormElementType.inputTextarea: return h(VInputTextarea, inputProps);
    case FormElementType.inputDate: return h(VInputDate, inputProps);
    case FormElementType.inputTime:return h(VInputTime, inputProps);
    case FormElementType.inputDateTime:return h(VInputDateTime, inputProps);
    default:
      throw new UnknownFormElementTypeException((elementData as FormElementData).type);
  }
}
</script>

<template>
  <UForm class="flex flex-col gap-2" :disabled="props.isDisabled" @submit="emits('submit')">
    <VFormField v-for="(elementData, elementName) of elements as Record<string, FormElementData>" v-bind="elementData">
      <component :is="getFormElementInput(elementName as K, elementData)" />
    </VFormField>
  </UForm>
</template>