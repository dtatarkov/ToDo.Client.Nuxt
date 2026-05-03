<script setup lang="ts">
import { UButton } from '#components';
import type { ButtonViewmodelColor } from '../types/buttonViewmodelColor';

type VButtonGeneralProps = {
  title?: string;
  color?: ButtonViewmodelColor;
  isDisabled?: boolean;
  isLoading?: boolean;
};

// Define emits
type VButtonGeneralEmits = {
  (e: 'click'): void;
};

const props = withDefaults(defineProps<VButtonGeneralProps>(), {
  title: '',
  color: 'neutral',
  isDisabled: false,
  isLoading: false,
});

defineEmits<VButtonGeneralEmits>();
</script>

<template>
  <UButton
    :label="props.title"
    :color="props.color"
    variant="outline"
    size="lg"
    :disabled="props.isDisabled"
    :loading="props.isLoading"
    class="cursor-pointer"
    @click="$emit('click')"
  />
</template>