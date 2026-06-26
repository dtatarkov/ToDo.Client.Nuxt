<template>
  <VToggleIcon
    v-if="isTimelineAvailable"
    v-model:is-active="isTimelineActive"
    :active-icon="Icon.bellActive"
    :inactive-icon="Icon.bellInactive"
  />
</template>

<script setup lang="ts">
import VToggleIcon from '@/modules/uikit/components/VToggleIcon.vue';
import { Icon } from '@/modules/shared/enums/icons';
import { useService } from '@/modules/shared/composables/useService';
import { useEventDrivenRef } from '@/modules/shared/composables/useEventDrivenRef';
import { Sidebar } from '@/modules/sidebar/entities/sidebar';

const sidebar = useService(Sidebar);

const isTimelineActive = useEventDrivenRef({
    getter: () => sidebar.timeline.isActive,

    setter: (isActive) => {
      if(isActive) 
      {
        sidebar.timeline.activate();
      }
      else 
      {
        sidebar.timeline.deactivate();
      }
    },

    on: (callback, disposeToken) => sidebar.timeline.onActiveStateChange(callback, disposeToken),
});

const isTimelineAvailable = useEventDrivenRef({
    getter: () => sidebar.timeline.isAvailable,
    on: (callback, disposeToken) => sidebar.timeline.onAvailabilityChange(callback, disposeToken),
});
</script>