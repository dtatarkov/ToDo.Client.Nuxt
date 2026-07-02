<template>
  <VTimelineNotificationBase :notification="props.rootNotification" />
  <VTimelineNotificationChildren :root-notification="props.rootNotification" />
</template>

<script setup lang="ts">
import type { AppRootNotification } from '../entities/appRootNotification';
import VTimelineNotificationBase from './VTimelineNotificationBase.vue';
import VTimelineNotificationChildren from './VTimelineNotificationChildren.vue';

type Props = {
  rootNotification: AppRootNotification;
}

const props = defineProps<Props>();
</script>
