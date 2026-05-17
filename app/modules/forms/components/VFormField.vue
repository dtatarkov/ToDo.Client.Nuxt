<script setup lang="ts">
import { UFormField } from "#components";

type Props = {
 name?: string;
 label?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <UFormField class="flex flex-col gap-1" :name="props.name" :label="props.label">
    <slot />
  </UFormField>
</template>