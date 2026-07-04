<template>
  <UCollapsible>
    <slot />

    <template #content>
      <slot name="content" />
    </template>
  </UCollapsible>
</template>
