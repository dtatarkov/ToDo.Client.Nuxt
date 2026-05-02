<script setup lang="ts">
import { UFormField } from "#components";
import type { FormFieldViewmodel } from "../interfaces/formFieldViewmodel";

defineProps<{ field: FormFieldViewmodel }>();
</script>

<template>
  <UFormField class="flex flex-col gap-1" :name="field.name" :label="field.label">
    <component :is="field.content.component" v-if="field.content" />
  </UFormField>
</template>