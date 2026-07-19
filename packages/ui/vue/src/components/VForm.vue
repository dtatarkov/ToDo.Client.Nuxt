<script setup lang="ts">
type Props = {
  isDisabled?: boolean;
}

type Emits = {
  (e: 'submit'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<template>
  <UForm class="flex flex-col gap-2" :disabled="props.isDisabled" @submit="emits('submit')">
    <slot />
  </UForm>
</template>