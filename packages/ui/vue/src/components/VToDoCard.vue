<template>
    <VCard :title="props.title" :description="props.description">
        <template #actions>
            <VButtonIcon :icon="Icon.pencilSquare" @click="emits('edit')" />
        </template>

        <template v-if="state.hasFooter" #footer>
            <VInfoBlock>
                <VInfoRow v-for="row of state.infoBlock.rows" :label="messages.getMessage(row.labelKey)">{{ row.content }}</VInfoRow>
            </VInfoBlock>
        </template>
    </VCard>
</template>

<script setup lang="ts">
import { Icon } from '@client/shared';
import { MessagesService } from '@client/infrastructure-messages';
import type { ToDoCardData } from '@client/ui-core';
import { ToDoCardViewmodel } from '@client/ui-core';
import { useService } from '../composables/useService';
import VCard from './VCard.vue';
import VButtonIcon from './VButtonIcon.vue';
import VInfoBlock from './VInfoBlock.vue';
import VInfoRow from './VInfoRow.vue';
import { useViewmodel } from '../composables/useViewmodel';
import { watchEffect } from 'vue';

type Emits = {
    (e: 'edit'): void;
}

const props = defineProps<ToDoCardData>();
const emits = defineEmits<Emits>();

const messages = useService(MessagesService);

const viewmodel = useService(ToDoCardViewmodel);
const state = useViewmodel(viewmodel);

watchEffect(() => {
    viewmodel.setData(props);
});
</script>
