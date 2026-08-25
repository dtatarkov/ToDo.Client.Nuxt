<script setup lang="ts">
import { computed } from 'vue';
import { isStringEmpty } from '@client/shared';
import type { ButtonGeneralData } from '@client/ui-uikit';
import { useMessages } from '../composables/useMessages';

type VButtonGeneralEmits = {
  (e: 'click'): void;
};

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<Partial<ButtonGeneralData>>(), {
  color: 'neutral',
  isDisabled: false,
  isLoading: false,
});

defineEmits<VButtonGeneralEmits>();

const { getMessage } = useMessages();

const title = computed(() => getMessage(props.titleKey));
const hasTitle = computed(() => !isStringEmpty(title.value));
</script>

<template>
  <UButton
    v-if="hasTitle"
    :label="title"
    :color="props.color"
    variant="outline"
    size="lg"
    :disabled="props.isDisabled"
    :loading="props.isLoading"
    class="cursor-pointer"
    @click="$emit('click')"
  />
</template>
