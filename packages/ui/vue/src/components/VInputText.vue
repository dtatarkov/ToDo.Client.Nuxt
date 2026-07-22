<template>
  <UInput
    :id="props.id"
    v-model="valueModel"
    :name="props.name"
    :autofocus="props.hasAutofocus"
    :placeholder="getMessage(props.placeholderKey)"
    :disabled="props.isDisabled"
    :color="props.color"
    :highlight="props.shouldHighlight"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { useMessages } from '../composables/useMessages';
import type { VInputTextProps } from '../types/vInputTextProps';

defineOptions({
  inheritAttrs: false
});

const { getMessage } = useMessages();

const props = defineProps<VInputTextProps>();
const valueModel = defineModel<string>('value', { default: '' });
</script>