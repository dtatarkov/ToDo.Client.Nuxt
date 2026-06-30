<template>
  <UIcon :name="props.notification.icon" :class="iconCssClasses" />
</template>

<script setup lang="ts">
import type { AppNotification } from '../entities/appNotification';

const props = defineProps<{
    notification: AppNotification;
}>();

const iconCssClasses = computed(() => {
    const color = props.notification.getColor();
    return `text-${color}`;
});
</script>
