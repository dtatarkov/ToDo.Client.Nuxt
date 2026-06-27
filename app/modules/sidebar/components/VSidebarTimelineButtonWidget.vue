<template>
  <VToggleIcon
    v-if="isTimelineAvailable"
    v-model:is-active="isTimelineActive"
    :active-icon="Icon.bellActive"
    :inactive-icon="Icon.bellInactive"
    @update:is-active="handleTimelineActivityToggleChange"
  />
</template>

<script setup lang="ts">
import VToggleIcon from '@/modules/uikit/components/VToggleIcon.vue';
import { Icon } from '@/modules/shared/enums/icons';
import { useService } from '@/modules/shared/composables/useService';
import { Sidebar } from '@/modules/sidebar/entities/sidebar';
import { useObservableReadonly } from '@/modules/shared/composables/useObservableReadonly';

const sidebar = useService(Sidebar);
const timeline = sidebar.timeline;

const isTimelineActive = useObservableReadonly(timeline.isActive);
const isTimelineAvailable = useObservableReadonly(timeline.isAvailable);

function handleTimelineActivityToggleChange(isActive: boolean) 
{
  if(isActive) 
  {
    timeline.activate();
  }
  else 
  {
    timeline.deactivate();
  }
}
</script>