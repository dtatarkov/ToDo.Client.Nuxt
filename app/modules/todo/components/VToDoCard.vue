<script setup lang="ts">
import VButtonIcon from '@/modules/uikit/components/VButtonIcon.vue';
import VCard from '@/modules/uikit/components/VCard.vue';
import VInfoBlock from '@/modules/uikit/components/VInfoBlock.vue';
import VInfoRow from '@/modules/uikit/components/VInfoRow.vue';
import { useService } from '@/modules/shared/composables/useService';
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import { DatesService } from '@/modules/shared/interfaces/datesService';
import type { ToDoCardData } from '../types/todoCardData';

type Emits = {
    (e: 'edit'): void;
}

const props = defineProps<ToDoCardData>();
const emits = defineEmits<Emits>();

const datesService = useService(DatesService);
const stringsService = useService(StringsService);

const formattedCompletionDateActual = computed(() => datesService.formatDateOptional(props.completionDateActual));
const formattedCompletionDatePlanned = computed(() => datesService.formatDateOptional(props.completionDatePlanned));

const hasFormattedCompletionDateActual = computed(() => !stringsService.isStringEmpty(formattedCompletionDateActual.value));
const hasFormattedCompletionDatePlanned = computed(() => !stringsService.isStringEmpty(formattedCompletionDatePlanned.value));
const hasFooter = computed(() => hasFormattedCompletionDateActual.value || hasFormattedCompletionDatePlanned.value);
</script>

<template>
    <VCard :title="props.title" :description="props.description">
        <template #actions>
            <VButtonIcon icon="i-heroicons-pencil-square" @click="emits('edit')" />
        </template>

        <template v-if="hasFooter" #footer>
            <VInfoBlock>
                <VInfoRow v-if="formattedCompletionDateActual" label="Выполнено">{{ formattedCompletionDateActual }}</VInfoRow>
                <VInfoRow v-if="formattedCompletionDatePlanned" label="Выполнить до">{{ formattedCompletionDatePlanned }}</VInfoRow>
            </VInfoBlock>
        </template>
    </VCard>
</template>