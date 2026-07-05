<template>
  <UInputTime
    :id="props.id"
    v-model="time"
    :name="props.name"
    :autofocus="props.hasAutofocus"
    :disabled="props.isDisabled"
    :color="props.color"
    :highlight="props.highlight"
    :hide-time-zone="true"
    :hour-cycle="24"
    granularity="minute"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { TimeMapper } from '@/modules/shared/mappers/timeMapper';
import { OptionalValueMapper } from '@/modules/shared/mappers/optionalValueMapper';
import type { InputTimeData } from '@/modules/uikit/types/inputTimeData';

defineOptions({
  inheritAttrs: false
});

const timeMapper = useService(TimeMapper);
const optionalTimeMapper = new OptionalValueMapper(timeMapper);

const props = defineProps<InputTimeData>();
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