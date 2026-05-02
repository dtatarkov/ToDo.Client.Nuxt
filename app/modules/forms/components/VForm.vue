<script setup lang="ts">
import type { FormViewmodel } from "../interfaces/formViewmodel";

defineProps<{ form: FormViewmodel }>();
</script>

<template>
  <UForm class="p-4 flex flex-col gap-4" :disabled="form.isDisabled" @submit="form.submit()">
    <component :is="element.component" v-for="element of form.elements" :key="element.key" />
  </UForm>
</template>