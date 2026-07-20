<script setup lang="ts">
import { FormElementType, type FormElementData } from '@client/ui-core';
import VFormField from './VFormField.vue';
import { h } from 'vue';
import VInputText from './VInputText.vue';
import VInputTextarea from './VInputTextarea.vue';
import { VInputDate, VInputTime } from '@client/ui-vue';
import VInputDateTime from './VInputDateTime.vue';
import { UnknownFormElementTypeException } from '../exceptions/unknownFormElementTypeException';

type Props = {
  elements: Record<string, FormElementData>;
  isDisabled?: boolean;
}

type Emits = {
  (e: 'submit'): void;
}

const props = withDefaults(defineProps<Props>(), { 
  isDisabled: false,
});

const emits = defineEmits<Emits>();

function getFormElementInput(data: FormElementData)
{
  switch (data.type) {
    case FormElementType.inputText: return h(VInputText, data);
    case FormElementType.inputTextarea: return h(VInputTextarea, data);
    case FormElementType.inputDate: return h(VInputDate, data);
    case FormElementType.inputTime:return h(VInputTime, data);
    case FormElementType.inputDateTime:return h(VInputDateTime, data);
    default:
      throw new UnknownFormElementTypeException((data as FormElementData).type);
  }
}
</script>

<template>
  <UForm class="flex flex-col gap-2" :disabled="props.isDisabled" @submit="emits('submit')">
    <VFormField v-for="element of elements" v-bind="element">
      <component :is="getFormElementInput(element)" />
    </VFormField>
  </UForm>
</template>