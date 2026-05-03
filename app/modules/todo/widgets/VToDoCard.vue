<template>
  <VCard 
    v-if="hasContent"
    :title="props.title" 
    :description="props.description"
  >
    <template #actions>
      <VButtonIcon
        icon="i-heroicons-pencil-square"
        @click="$emit('edit')"
      />
    </template>
    <template v-if="hasFooter" #footer>
      <VInfoBlock>
        <VInfoRow v-if="completionDateActualFormatted" label="Выполнено">
          {{ completionDateActualFormatted }}
        </VInfoRow>
        <VInfoRow v-if="completionDatePlannedFormatted" label="Выполнить до">
          {{ completionDatePlannedFormatted }}
        </VInfoRow>
      </VInfoBlock>
    </template>
  </VCard>
</template>

<script setup lang="ts">
import { useService } from '@/modules/shared/composables/useService';
import { computed } from 'vue';
import VCard from '@/modules/uikit/components/VCard.vue';
import VInfoBlock from '@/modules/uikit/components/VInfoBlock.vue';
import VInfoRow from '@/modules/uikit/components/VInfoRow.vue';
import { DatesService } from '@/modules/shared/interfaces/datesService';
import VButtonIcon from '@/modules/uikit/components/VButtonIcon.vue';
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import type { ToDoCardData } from '@/modules/todo/types/todoCardData';

const datesService = useService(DatesService);
const stringsService = useService(StringsService);

const props = withDefaults(defineProps<ToDoCardData>(), {
  title: '',
  description: '',
  completionDateActual: undefined,
  completionDatePlanned: undefined,
});

// Define emits
type VToDoCardEmits = {
  (e: 'edit'): void;
};

defineEmits<VToDoCardEmits>();

// Extract dates formatting into local computed variables using formatDateOptional
const completionDateActualFormatted = computed(() => {
  return datesService.formatDateOptional(props.completionDateActual);
});

const completionDatePlannedFormatted = computed(() => {
  return datesService.formatDateOptional(props.completionDatePlanned);
});

const hasFooter = computed(() => {
  return !stringsService.isStringEmpty(completionDateActualFormatted.value) || 
         !stringsService.isStringEmpty(completionDatePlannedFormatted.value);
});

// Check if at least one content field has value
const hasContent = computed(() => {
  return !stringsService.isStringEmpty(props.title) || 
         !stringsService.isStringEmpty(props.description) || 
         hasFooter.value;
});
</script>