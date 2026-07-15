<script setup lang="ts">
import { computed } from 'vue';
import type { Color } from '@client/ui-core';
import { isStringEmpty } from '@client/shared';

type VButtonGeneralProps = {
  title?: string;
  color?: Color;
  isDisabled?: boolean;
  isLoading?: boolean;
};

type VButtonGeneralEmits = {
  (e: 'click'): void;
};

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<VButtonGeneralProps>(), {
  title: '',
  color: 'neutral',
  isDisabled: false,
  isLoading: false,
});

defineEmits<VButtonGeneralEmits>();

const hasTitle = computed(() => !isStringEmpty(props.title));
</script>

<template>
  <UButton
    v-if="hasTitle"
    :label="title"
    :color="color"
    variant="outline"
    size="lg"
    :disabled="isDisabled"
    :loading="isLoading"
    class="cursor-pointer"
    @click="$emit('click')"
  />
</template>
