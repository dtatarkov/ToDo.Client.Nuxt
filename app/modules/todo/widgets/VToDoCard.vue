<template>
  <VCard :title="props.title" :description="props.description">
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
import { StringsService } from '@/modules/shared/interfaces/stringsService';

const datesService = useService(DatesService);
const stringsService = useService(StringsService);

const props = withDefaults(defineProps<{
  title?: string;
  description?: string;
  completionDateActual?: Date;
  completionDatePlanned?: Date;
}>(), {
  title: '',
  description: '',
});

const completionDateActualFormatted = computed(() => datesService.formatDateOptional(props.completionDateActual));
const completionDatePlannedFormatted = computed(() => datesService.formatDateOptional(props.completionDatePlanned));

const hasFooter = computed(() => 
  !stringsService.isStringEmpty( completionDateActualFormatted.value) && 
  !stringsService.isStringEmpty(completionDatePlannedFormatted.value));
</script>