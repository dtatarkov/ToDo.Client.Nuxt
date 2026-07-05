<template>
  <VToggleIcon
    v-if="canActivateTimeline"
    :is-active="isTimelineActive"
    :active-icon="Icon.bellActive"
    :inactive-icon="Icon.bellInactive"
    @activated="handleToggleActivation"
    @deactivated="handleToggleDeactivation"
  />
</template>

<script setup lang="ts">
import VToggleIcon from '@/modules/uikit/components/VToggleIcon.vue';
import { Icon } from '@/modules/shared/enums/icons';
import { Sidebar } from '@/modules/sidebar/entities/sidebar';

const sidebar = useService(Sidebar);
const timeline = sidebar.timeline;

const isTimelineActive = useObservableReadonly(timeline.isActive);
const canActivateTimeline = useObservableReadonly(timeline.canActivate);

function handleToggleActivation() {
  timeline.activate()
}

function handleToggleDeactivation() {
  timeline.deactivate()
}
</script>