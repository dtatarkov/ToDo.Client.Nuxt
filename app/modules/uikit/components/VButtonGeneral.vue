<script setup lang="ts">
import { UButton } from '#components';
import { useService } from '@/modules/shared/composables/useService';
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import { computed } from 'vue';
import type { ButtonColor } from '../types/buttonColor';

type VButtonGeneralProps = {
  title?: string;
  color?: ButtonColor;
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

const stringsService = useService(StringsService);
const hasTitle = computed(() => !stringsService.isStringEmpty(props.title));
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