<script setup lang="ts">
import VFormField from './VFormField.vue';
import { h, type VNode } from 'vue';
import VInputText from './VInputText.vue';
import VInputTextarea from './VInputTextarea.vue';
import { VInputDate, VInputTime } from '@client/ui-vue';
import VInputDateTime from './VInputDateTime.vue';
import VInputHidden from './VInputHidden.vue';
import { InputType, UnknownInputTypeException } from '@client/ui-uikit';
import { type FormElementData } from '@client/ui-forms';
import type { FormData } from '@client/ui-forms';

type Emits = {
  (e: 'submit'): void;
}

const props = withDefaults(defineProps<FormData>(), { 
  elements: () => new Array<FormElementData>(),
  isDisabled: false,
});

const emits = defineEmits<Emits>();

function getFormElementInput(data: FormElementData): VNode
{
  switch (data.inputType) {
    case InputType.inputText: return h(VInputText, data);
    case InputType.inputTextarea: return h(VInputTextarea, data);
    case InputType.inputDate: return h(VInputDate, data);
    case InputType.inputTime: return h(VInputTime, data);
    case InputType.inputDateTime: return h(VInputDateTime, data);
    case InputType.inputHidden: return h(VInputHidden, data);
    default: throw new UnknownInputTypeException((<FormElementData>data).inputType);
  }
}

function getFormField(data: FormElementData, input: VNode): VNode
{
  return h(VFormField, data, () => input);
}

function getFormElement(data: FormElementData): VNode
{
  const input = getFormElementInput(data);

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