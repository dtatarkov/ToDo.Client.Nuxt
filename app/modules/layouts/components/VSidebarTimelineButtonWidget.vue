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

const timelineLayer = sidebar.layers.timeline;

const isTimelineActive = useEventDrivenRef({
    getter: () => timelineLayer.isActive,

    setter: (value) => {
      timelineLayer.isActive = value
    },

    on: (callback, disposeToken) => timelineLayer.onActiveStateChange(callback, disposeToken),
});

const isTimelineAvailable = useEventDrivenRef({
    getter: () => timelineLayer.isAvailable(),

    on: (callback, disposeToken) => timelineLayer.onAvailabilityChange(callback, disposeToken),
});
</script>