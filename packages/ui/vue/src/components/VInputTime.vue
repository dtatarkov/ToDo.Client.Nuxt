<template>
  <UInputTime
    :id="props.id"
    v-model="time"
    :name="props.name"
    :autofocus="props.hasAutofocus"
    :disabled="props.isDisabled"
    :color="props.color"
    :highlight="props.shouldHighlight"
    :hide-time-zone="true"
    :hour-cycle="24"
    granularity="minute"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { OptionalValueMapper  } from '@client/shared';
import { TimeMapper } from '@client/infrastructure-datetime';
import { computed } from 'vue';
import { useService } from '../composables/useService';
import type { VInputTimeProps } from '../types/vInputTimeProps';

defineOptions({
  inheritAttrs: false
});

const timeMapper = useService(TimeMapper);
const optionalTimeMapper = new OptionalValueMapper(timeMapper);

const props = defineProps<VInputTimeProps>();
const valueModel = defineModel<number>('value');

const time = computed({
  get() {
    return optionalTimeMapper.map(valueModel.value);
  },

  set(value) {
    valueModel.value = optionalTimeMapper.mapReverse(value);
  }
});
</script>