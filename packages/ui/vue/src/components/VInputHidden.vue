<template>
  <input
    type="hidden"
    :name="props.name"
    :value="valueModel"
  />
</template>

<script setup lang="ts">
import type { InputHiddenData } from '@client/ui-uikit';

defineOptions({
  inheritAttrs: false
});

const props = defineProps<Partial<InputHiddenData>>();
const valueModel = defineModel<any>('value', { default: undefined });
</script>
