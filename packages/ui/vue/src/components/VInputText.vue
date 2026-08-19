<template>
  <UInput
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
import type { InputTextData } from '@client/ui-uikit';
import { useInputData } from '../composables/useInputData';
import { useMessages } from '../composables/useMessages';

defineOptions({
  inheritAttrs: false
});

const { getMessage } = useMessages();

const props = defineProps<Partial<InputTextData>>();
const valueModel = defineModel<string>('value', { default: '' });

const { color, shouldHighlight } = useInputData(props);
</script>