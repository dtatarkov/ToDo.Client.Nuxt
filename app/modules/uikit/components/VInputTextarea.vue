<template>
  <UTextarea 
    :id="props.id" 
    v-model="valueModel" 
    :name="props.name" 
    :autofocus="props.hasAutofocus" 
    :placeholder="props.placeholder"
    :disabled="props.isDisabled" 
  />
</template>

<script setup lang="ts">
type Props = {
  id?: string;
  name?: string;
  hasAutofocus?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  value?: string;
}

defineOptions({
  inheritAttrs: false
});

const props = defineProps<Props>();
const valueModel = defineModel<string>('value', { default: '' });
</script>