<template>
  <VCollapsible
    v-if="hasChildNotifications"
    class="mt-2"
  >
    <VListToggleText
      :text="showAllNotificationsMessage"
      :count="childNotificationsCount"
    />

    <template #content>
      <VList v-slot="{ element }" :elements="childNotifications">
        <VTimelineNotificationBase :notification="element" />
      </VList>
    </template>
  </VCollapsible>
</template>

<script setup lang="ts">
import type { AppRootNotification } from '../entities/appRootNotification';
import VTimelineNotificationBase from './VTimelineNotificationBase.vue';
import VList from '@/modules/uikit/components/VList.vue';
import VListToggleText from '@/modules/uikit/components/VListToggleText.vue';
import VCollapsible from '@/modules/uikit/components/VCollapsible.vue';
import { MessagesService } from '@/modules/shared/services/messagesService';
import { useService } from '@/modules/shared/composables/useService';

const messagesService = useService(MessagesService);

type Props = {
  rootNotification: AppRootNotification;
}

const props = defineProps<Props>();

const showAllNotificationsMessage = messagesService.getMessage('timeline.showAllNotifications');

const childNotifications = computed(() => props.rootNotification.children);
const childNotificationsCount = computed(() => childNotifications.value.length);
const hasChildNotifications = computed(() => childNotificationsCount.value > 0);
</script>
