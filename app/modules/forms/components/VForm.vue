<script setup lang="ts">
import type { Form } from "../interfaces/form";

defineProps<{ form: Form }>();
</script>

<template>
  <UForm class="p-4 flex flex-col gap-4" @submit="form.submit()" :disabled="form.isDisabled">
    <component v-for="element of form.elements" :key="element.key" :is="element.component" />
  </UForm>
</template>