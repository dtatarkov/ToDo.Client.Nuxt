<script lang="ts" setup>
import VGrid from "@/modules/uikit/components/VGrid.vue";
import { useToDoCards } from "../composables/useToDoCards";

const { cards } = await useToDoCards();
</script>

<template>
  <div class="p-4">
    <VGrid>
      <component v-for="card of cards" :key="card.key" :is="card.component" />
    </VGrid>
  </div>
</template>