<script setup lang="ts">
import { UFormField } from "#components";
import type { FormFieldViewmodel } from "../interfaces/formFieldViewmodel";

defineProps<{ field: FormFieldViewmodel }>();
</script>

<template>
  <UFormField class="flex flex-col gap-1" :name="field.name" :label="field.label">
    <component v-if="field.content" :is="field.content.component" />
  </UFormField>
</template>