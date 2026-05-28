<script setup lang="ts">
import { UFormField } from "#components";

type Props = {
 name?: string;
 label?: string;
}

const props = defineProps<Props>();

const uiModifiers = {
  container: 'grid grid-cols-1'
}
</script>

<template>
  <UFormField class="flex flex-col gap-1" :name="props.name" :label="props.label" :ui="uiModifiers">
    <slot />
  </UFormField>
</template>