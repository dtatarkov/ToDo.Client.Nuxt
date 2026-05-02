<template>
  <UCard variant="subtle" :ui="cardUIOptions">
    <slot />
  </UCard>
</template>

<script setup>
const cardUIOptions = {
  root  : 'rounded-sm',
  body  : 'flex justify-end p-2 sm:p-2 gap-2'
}
</script>