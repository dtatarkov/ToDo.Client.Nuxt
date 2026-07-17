<script setup lang="ts">
import { computed } from 'vue';
import VButtonIcon from './VButtonIcon.vue';
import type { Icon } from '@client/shared';

type Props = {
  activeIcon: Icon;
  inactiveIcon: Icon;
}

type Emits = {
  (e: 'activated'): void;
  (e: 'deactivated'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const isActive = defineModel<boolean>('isActive', { default: false });
const icon = computed(() => isActive.value ? props.activeIcon : props.inactiveIcon);

function handleClick() {
    isActive.value = !isActive.value;

    if (isActive.value) 
    {
        emits('activated');
    }
    else 
    {
      emits('deactivated');
    }
}
</script>

<template>
  <VButtonIcon
    :icon="icon"
    @click="handleClick"
  />
</template>
