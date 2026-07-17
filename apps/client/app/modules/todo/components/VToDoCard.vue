<script setup lang="ts">
import { Icon, isStringEmpty } from '@client/shared';
import type { ToDoCardData } from '../types/todoCardData';
import { DateFormatter } from '@client/infrastructure-datetime';
import { VCard, VButtonIcon, VInfoBlock, VInfoRow } from '@client/ui-vue';
import { MessagesService } from '@client/infrastructure-messages';

const dateFormatter = useService(DateFormatter);
const messagesService = useService(MessagesService);

const completedLabel = messagesService.getMessage('todo.card.completed');
const completeByLabel = messagesService.getMessage('todo.card.completeBy');

type Emits = {
    (e: 'edit'): void;
}

const props = defineProps<ToDoCardData>();
const emits = defineEmits<Emits>();

const formattedCompletionDateActual = computed(() => dateFormatter.formatDateOptional(props.completionDateActual));
const formattedCompletionDatePlanned = computed(() => dateFormatter.formatDateOptional(props.completionDatePlanned));

const hasFormattedCompletionDateActual = computed(() => !isStringEmpty(formattedCompletionDateActual.value));
const hasFormattedCompletionDatePlanned = computed(() => !isStringEmpty(formattedCompletionDatePlanned.value));
const hasFooter = computed(() => hasFormattedCompletionDateActual.value || hasFormattedCompletionDatePlanned.value);
</script>

<template>
    <VCard :title="props.title" :description="props.description">
        <template #actions>
            <VButtonIcon :icon="Icon.pencilSquare" @click="emits('edit')" />
        </template>

        <template v-if="hasFooter" #footer>
            <VInfoBlock>
                <VInfoRow v-if="formattedCompletionDateActual" :label="completedLabel">{{ formattedCompletionDateActual }}</VInfoRow>
                <VInfoRow v-if="formattedCompletionDatePlanned" :label="completeByLabel">{{ formattedCompletionDatePlanned }}</VInfoRow>
            </VInfoBlock>
        </template>
    </VCard>
</template>