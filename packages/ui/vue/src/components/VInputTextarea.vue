<template>
  <UTextarea
    :id="props.id"
    v-model="valueModel"
    :name="props.name"
    :autofocus="props.hasAutofocus"
    :placeholder="getMessage(props.placeholderKey)"
    :disabled="props.isDisabled"
    :color="props.color"
    :highlight="props.highlight"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { useMessages } from '../composables/useMessages';
import type { InputElementTextareaData } from '@client/ui-core';

defineOptions({
  inheritAttrs: false
});

const { getMessage } = useMessages();

const props = defineProps<InputElementTextareaData>();
const valueModel = defineModel<string>('value', { default: '' });
</script>