<template>
  <UIcon :name="props.notification.icon" :class="iconCssClasses" />
</template>

<script setup lang="ts">
import type { AppNotification } from '../entities/appNotification';

type Props = {
    notification: AppNotification;
}

const props = defineProps<Props>();

const color = props.notification.getColor();
const iconCssClasses =  `text-${color}`;
</script>
