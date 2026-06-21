<template>
  <VHeader :title="config.public.appTitle">
    <template #right>
      <VToggleIcon
        v-model:is-active="isNotificationsTimelineActive"
        :active-icon="Icon.bellActive"
        :inactive-icon="Icon.bellInactive"
      />
    </template>
  </VHeader>
</template>

<script setup lang="ts">
import VHeader from '@/modules/uikit/components/VHeader.vue';
import VToggleIcon from '@/modules/uikit/components/VToggleIcon.vue';
import { Icon } from '@/modules/shared/enums/icons';
import { useService } from '@/modules/shared/composables/useService';
import { useEventDrivenRef } from '@/modules/shared/composables/useEventDrivenRef';
import { Sidebar } from '@/modules/sidebar/entities/sidebar';

const config = useRuntimeConfig();
const sidebar = useService(Sidebar);

const notificationsLayer = sidebar.layers.notificationsTimeline;

const isNotificationsTimelineActive = useEventDrivenRef({
    getter: () => notificationsLayer.isActive,

    setter: (value) => {
      notificationsLayer.isActive = value
    },

    on: (callback, disposeToken) => notificationsLayer.onActiveStateChange(callback, disposeToken),
});
</script>