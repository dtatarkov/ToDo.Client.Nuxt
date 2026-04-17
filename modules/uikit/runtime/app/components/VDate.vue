<template>
  <span class="ui-date">
    {{ props.date }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  date: {
    type: String,
    required: true,
  }
});
</script>