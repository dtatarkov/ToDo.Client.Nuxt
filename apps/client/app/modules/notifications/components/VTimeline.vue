<template>
  <UTimeline :items="timelineItems">
    <template #indicator="{ item }">
      <VTimelineIndicator :notification="item.notification" />
    </template>

    <template #wrapper="{ item }">
      <VTimelineNotificationRoot :root-notification="item.notification" />
    </template>
  </UTimeline>
</template>

<script setup lang="ts">
import type { TimelineData } from '@/modules/notifications/types/timelineData';
import VTimelineIndicator from './VTimelineIndicator.vue';
import VTimelineNotificationRoot from './VTimelineNotificationRoot.vue';

const props = defineProps<TimelineData>();

const timelineItems = computed(() => props.notifications.map(n => ({ notification: n })));
</script>
