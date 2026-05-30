<template>
  <UInput
    :id="props.id"
    v-model="valueModel"
    :name="props.name"
    :autofocus="props.hasAutofocus"
    :placeholder="props.placeholder"
    :disabled="props.isDisabled"
    :color="props.color"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import type { InputTextData } from '@/modules/uikit/types/inputTextData';

defineOptions({
  inheritAttrs: false
});

const props = defineProps<InputTextData>();
const valueModel = defineModel<string>('value', { default: '' });
</script>