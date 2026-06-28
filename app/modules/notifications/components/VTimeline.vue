<template>
  <UTimeline :items="timelineItems" />
</template>

<script setup lang="ts">
import { DateFormatter } from '@/modules/shared/services/dateFormatter';
import { useService } from '@/modules/shared/composables/useService';
import type { TimelineData } from '@/modules/notifications/types/timelineData';

const dateFormatter = useService(DateFormatter);

const props = defineProps<TimelineData>();

const timelineItems = computed(() =>
  props.notifications.map(notification => ({
    title: notification.title,
    description: notification.description,
    icon: notification.icon,
    date: dateFormatter.formatDate(notification.date),
  }))
);
</script>