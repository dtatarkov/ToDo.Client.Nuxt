<script setup lang="ts">
import { UButton } from '#components';
import { Icon, isStringEmpty  } from '@packages/shared';

import { computed } from 'vue';

type VButtonIconProps = {
  icon?: Icon;
  isDisabled?: boolean;
};

type VButtonIconEmits = {
  (e: 'click'): void;
};

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<VButtonIconProps>(), {
  icon: Icon.questionMarkCircle,
  isDisabled: false,
});

defineEmits<VButtonIconEmits>();

const hasIcon = computed(() => {
  return !isStringEmpty(props.icon);
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