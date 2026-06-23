<template>
  <UTimeline :items="timelineItems" />
</template>

<script setup lang="ts">
import { DateFormatter } from '@/modules/shared/services/dateFormatter';
import { useService } from '@/modules/shared/composables/useService';
import type { AppNotification } from '@/modules/notifications/entities/appNotification';

const dateFormatter = useService(DateFormatter);

type Props = {
    notifications: AppNotification[];
}

const props = defineProps<Props>();

const timelineItems = computed(() =>
  props.notifications.map(notification => ({
    title: notification.title,
    description: notification.description,
    icon: notification.icon,
    date: dateFormatter.formatDate(notification.date),
  }))
);
</script>