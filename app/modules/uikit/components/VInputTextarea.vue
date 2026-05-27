<template>
  <UTextarea 
    :id="props.id" 
    v-model="valueModel" 
    :name="props.name" 
    :autofocus="props.hasAutofocus" 
    :placeholder="props.placeholder"
    :disabled="props.isDisabled" 
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import type { InputTextareaData } from '@/modules/uikit/types/inputTextareaData';

defineOptions({
  inheritAttrs: false
});

const props = defineProps<InputTextareaData>();
const valueModel = defineModel<string>('value', { default: '' });
</script>