<template>
  <UTextarea
    :id="props.id"
    v-model="valueModel"
    :name="props.name"
    :autofocus="props.hasAutofocus"
    :placeholder="getMessage(props.placeholderKey)"
    :disabled="props.isDisabled"
    :color="color"
    :highlight="shouldHighlight"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { useMessages } from '../composables/useMessages';
import { useInputData } from '../composables/useInputData';
import type { InputTextareaData } from '@client/ui-core';

defineOptions({
  inheritAttrs: false
});

const { getMessage } = useMessages();

const props = defineProps<InputTextareaData>();
const valueModel = defineModel<string>('value', { default: '' });

const { color, shouldHighlight } = useInputData(props);
</script>