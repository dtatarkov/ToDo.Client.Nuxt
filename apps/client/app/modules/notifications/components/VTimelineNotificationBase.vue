<template>
  <section>
    <div class="text-dimmed text-xs/5">{{ formattedDate }}</div>
    <div class="font-medium text-highlighted text-sm">{{ notification.title }}</div>
    <div class="text-muted text-wrap text-sm whitespace-pre-wrap">{{ notification.description }}</div>
  </section>
</template>

<script setup lang="ts">
import { DateFormatter } from '@/modules/shared/services/dateFormatter';
import type { AppNotification } from '../entities/appNotification';

const dateFormatter = useService(DateFormatter);

type Props = {
  notification: AppNotification;
}

const props = defineProps<Props>();
const formattedDate = computed(() => dateFormatter.formatDate(props.notification.date));
</script>
