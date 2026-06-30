<template>
  <div class="text-dimmed text-xs/5">{{ formattedDate }}</div>
  <div class="font-medium text-highlighted text-sm">{{ props.notification.title }}</div>
  <div class="text-muted text-wrap text-sm whitespace-pre-wrap">{{ props.notification.description }}</div>
</template>

<script setup lang="ts">
import { DateFormatter } from '@/modules/shared/services/dateFormatter';
import { useService } from '@/modules/shared/composables/useService';
import type { AppNotification } from '../entities/appNotification';

const dateFormatter = useService(DateFormatter);

const props = defineProps<{
    notification: AppNotification;
}>();

const formattedDate = computed(() => dateFormatter.formatDate(props.notification.date));
</script>
