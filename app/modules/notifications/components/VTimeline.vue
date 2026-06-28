<template>
  <UTimeline :items="timelineItems">
    <template #indicator="{ item }">
      <UIcon :name="item.icon" :class="item.iconCssClasses" />
    </template>
  </UTimeline>
</template>

<script setup lang="ts">
import { DateFormatter } from '@/modules/shared/services/dateFormatter';
import { useService } from '@/modules/shared/composables/useService';
import type { TimelineData } from '@/modules/notifications/types/timelineData';
import type { AppNotification } from '../entities/appNotification';

const dateFormatter = useService(DateFormatter);

const props = defineProps<TimelineData>();

function getIconCssClasses(notification: AppNotification) {
  const color = notification.getColor();
  const cssClasses = `text-${color}`;

  return cssClasses;
}

const timelineItems = computed(() =>
  props.notifications.map(notification => ({
    title: notification.title,
    description: notification.description,
    icon: notification.icon,
    iconCssClasses: getIconCssClasses(notification),
    date: dateFormatter.formatDate(notification.date),
  }))
);
</script>