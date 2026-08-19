<script setup lang="ts">
import VFormField from './VFormField.vue';
import type { FormElementData, FormData } from '@client/ui-forms';
import { InputType } from '@client/ui-uikit';
import { h, type VNode } from 'vue';
import VInputText from './VInputText.vue';
import VInputTextarea from './VInputTextarea.vue';
import VInputDate from './VInputDate.vue';
import VInputTime from './VInputTime.vue';
import VInputDateTime from './VInputDateTime.vue';
import VInputHidden from './VInputHidden.vue';
import type { FormDataInit } from '@client/ui-forms';

type Emits = {
  (e: 'submit'): void;
}

const props = withDefaults(defineProps<FormDataInit>(), { 
  elements: () => new Array<Partial<FormElementData>>(),
  isDisabled: false,
});

const emits = defineEmits<Emits>();

function getFormElementInput(data: Partial<FormElementData>): VNode | undefined
{
  switch (data.inputType) 
  {
    case InputType.inputText: return h(VInputText, data);
    case InputType.inputTextarea: return h(VInputTextarea, data);
    case InputType.inputDate: return h(VInputDate, data);
    case InputType.inputTime: return h(VInputTime, data);
    case InputType.inputDateTime: return h(VInputDateTime, data);
    case InputType.inputHidden: return h(VInputHidden, data);    
  }

  return undefined;
}

function getFormField(data: Partial<FormElementData>, input: VNode): VNode
{
  return h(VFormField, data, () => input);
}

function getFormElement(data: Partial<FormElementData>): VNode | undefined
{
  const input = getFormElementInput(data);

  if(input == undefined)
  {
    return undefined;
  }

  if (data.inputType === InputType.inputHidden)
  {
    return input;
  }

  return getFormField(data, input);
}
</script>

<template>
  <UForm class="flex flex-col gap-2" :disabled="props.isDisabled" @submit="emits('submit')">
    <component
      v-for="elementData of elements"
      :key="elementData.name"
      :is="getFormElement(elementData)"
    />
  </UForm>
</template>