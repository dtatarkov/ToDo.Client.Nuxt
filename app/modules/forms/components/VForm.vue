<script setup lang="ts">
import type { FormData } from '../types/formData';

type Emits = {
  (e: 'submit'): void;
}

const props = defineProps<FormData>();
const emits = defineEmits<Emits>();
</script>

<template>
  <UForm class="p-4 flex flex-col gap-4" :disabled="props.isDisabled" @submit="emits('submit')">
    <slot />
  </UForm>
</template>