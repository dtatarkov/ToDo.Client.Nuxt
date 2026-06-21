<script setup lang="ts">
import VButtonIcon from '@/modules/uikit/components/VButtonIcon.vue';
import type { Icon } from '@/modules/shared/enums/icons';

const props = defineProps<{
  activeIcon: Icon;
  inactiveIcon: Icon;
}>();

const isActive = defineModel<boolean>('isActive', { default: false });
const icon = computed(() => isActive.value ? props.activeIcon : props.inactiveIcon);

function handleClick() {
    isActive.value = !isActive.value;
}
</script>

<template>
  <VButtonIcon
    :icon="icon"
    @click="handleClick"
  />
</template>