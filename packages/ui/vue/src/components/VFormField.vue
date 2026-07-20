<script setup lang="ts">
import { isStringEmpty } from '@client/shared';
import { computed } from 'vue';
import { useMessages } from '../composables/useMessages';
import type { MessageKey } from '@client/infrastructure-messages';

defineOptions({
  inheritAttrs : false,
});

type Props = {
 name?: string;
 labelKey?: MessageKey;
 help?: string;
}

const { getMessage } = useMessages();

const props = defineProps<Props>();  
const hasHelp = computed(() => !isStringEmpty(props.help));

const uiModifiers = computed(() => ({
  root: 'flex flex-col gap-1',
  container: 'grid grid-cols-1' + (!hasHelp.value ? ' mb-5' : ''),
  help: 'text-xs mt-1 text-error',
}));
</script>

<template>
  <UFormField :name="props.name" :label="getMessage(props.labelKey)" :help="props.help" :ui="uiModifiers">
    <slot />
  </UFormField>
</template>