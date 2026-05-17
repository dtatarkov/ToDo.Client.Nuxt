<script setup lang="ts">
import { UButton } from '#components';
import { useService } from '@/modules/shared/composables/useService';
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import { computed } from 'vue';

type VButtonIconProps = {
  icon?: string;
  isDisabled?: boolean;
};

type VButtonIconEmits = {
  (e: 'click'): void;
};

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<VButtonIconProps>(), {
  icon: 'i-heroicons-question-mark-circle',
  isDisabled: false,
});

defineEmits<VButtonIconEmits>();

const stringsService = useService(StringsService);

const hasIcon = computed(() => {
  return !stringsService.isStringEmpty(props.icon);
});
</script>

<template>
  <UButton
    v-if="hasIcon"
    :icon="props.icon"
    color="secondary"
    variant="link"
    size="sm"
    :disabled="props.isDisabled"
    class="cursor-pointer hover:text-primary"
    @click="$emit('click')"
  />
</template>