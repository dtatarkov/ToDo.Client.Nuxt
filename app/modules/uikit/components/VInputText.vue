<template>
  <UInput 
    :id="props.id" 
    v-model="valueModel" 
    :name="props.name" 
    :autofocus="props.hasAutofocus" 
    :placeholder="props.placeholder"
    :disabled="props.isDisabled" 
  />
</template>

<script setup lang="ts">
type VInputTextProps = {
  id?: string;
  name?: string;
  hasAutofocus?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  value?: string;
}

const props = defineProps<VInputTextProps>();
const valueModel = defineModel<string>('value', { default: '' });
</script>