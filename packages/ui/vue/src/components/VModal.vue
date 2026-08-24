<script setup lang="ts">
import { computed, h, type VNode } from 'vue';
import { FormViewmodel } from '@client/ui-forms';
import type { FormDataPartial } from '@client/ui-forms';
import VForm from './VForm.vue';
import type { ModalDataPartial } from '@client/ui-overlay';

const props = withDefaults(
  defineProps<ModalDataPartial>(),
  {
    isInline: true,
    title: '',
    description: '',
    isDisabled: false,
  }
);

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const isDismissible = computed(() => !props.isDisabled);

const hasButtons = computed(() => props.buttonConfirm || props.buttonCancel);

function handleOpen(isOpened: boolean) {
  if (!isOpened) {
    emits('close');
  }
}

function getContentVNode(): VNode | undefined {
  switch (props.content?.renderKey) {
    case FormViewmodel.renderKey:
      return h(VForm, props.content.data as FormDataPartial);
    default:
      return undefined;
  }
}
</script>

<template>
  <UModal
    :default-open="true"
    :transition="false"
    :description="props.description"
    :dismissible="isDismissible"
    :portal="!props.isInline"
    @update:open="handleOpen"
  >
    <template #title>
      {{ props.title }}
    </template>

    <template #body>
      <component :is="getContentVNode()" />

      <div v-if="hasButtons" class="flex gap-2 justify-end pt-2">
        <UButton
          v-if="props.buttonCancel"
          v-bind="props.buttonCancel"
          @click="emits('close')"
        />
        <UButton
          v-if="props.buttonConfirm"
          v-bind="props.buttonConfirm"
        />
      </div>
    </template>
  </UModal>
</template>