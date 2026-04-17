<script setup lang="ts">
import { UFormField } from "#components";
import type { FormField } from "../interfaces/formField";

defineProps<{ field: FormField }>();
</script>

<template>
  <UFormField class="flex flex-col gap-1" :name="field.name" :label="field.label">
    <component v-if="field.content" :is="field.content.component" />
  </UFormField>
</template>