<template>
  <UTimeline :items="timelineItems" />
</template>

<script setup lang="ts">
import { DateFormatter } from '@/modules/shared/services/dateFormatter';
import type { TimelineRecord } from '../types/timelineRecord';
import { useService } from '@/modules/shared/composables/useService';

const dateFormatter = useService(DateFormatter);

type Props = {
    records: TimelineRecord[];
}

const props = defineProps<Props>();

const timelineItems = computed(() =>
  props.records.map(record => ({
    title: record.title,
    description: record.description,
    icon: record.icon,
    date: dateFormatter.formatDate(record.date),
  }))
);
</script>