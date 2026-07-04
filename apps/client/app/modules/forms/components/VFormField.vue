<script setup lang="ts">
import { UFormField } from "#components";
import { isStringEmpty } from '@/modules/shared/utils/isStringEmpty';

type Props = {
 name?: string;
 label?: string;
 help?: string;
}

const props = defineProps<Props>();  
const hasHelp = computed(() => !isStringEmpty(props.help));

const uiModifiers = computed(() => ({
  root: 'flex flex-col gap-1',
  container: 'grid grid-cols-1' + (!hasHelp.value ? ' mb-5' : ''),
  help: 'text-xs mt-1 text-error',
}));
</script>

<template>
  <UFormField :name="props.name" :label="props.label" :help="props.help" :ui="uiModifiers">
    <slot />
  </UFormField>
</template>