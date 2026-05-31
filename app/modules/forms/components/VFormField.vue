<script setup lang="ts">
import { UFormField } from "#components";
import { isStringEmpty } from '@/modules/shared/utils/isStringEmpty';

type Props = {
 name?: string;
 label?: string;
 help?: string;
}

const props = defineProps<Props>();

const uiModifiers = reactive({
  container: computed(() => 'grid grid-cols-1' + 
    isStringEmpty(props.help) ? 'mb-5' : ''),
  help: 'text-xs mt-1 text-error',
})
</script>

<template>
  <UFormField class="flex flex-col gap-1" :name="props.name" :label="props.label" :help="props.help" :ui="uiModifiers">
    <slot />
  </UFormField>
</template>