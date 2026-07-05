<template>
  <UInputDate
    :id="props.id"
    v-model="date"
    :name="props.name"
    :autofocus="props.hasAutofocus"
    :disabled="props.isDisabled"
    :color="props.color"
    :highlight="props.highlight"
    :hide-time-zone="true"
    granularity="day"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ZonedDateTimeMapper } from '@/modules/shared/mappers/zonedDateTimeMapper';
import { OptionalValueMapper } from '@/modules/shared/mappers/optionalValueMapper';
import type { InputDateData } from '@/modules/uikit/types/inputDateData';

defineOptions({
  inheritAttrs: false
});

const dateMapper = useService(ZonedDateTimeMapper);
const optionalDateMapper = new OptionalValueMapper(dateMapper);

const props = defineProps<InputDateData>();
const valueModel = defineModel<Date>('value');

const date = computed({
  get() {
    return optionalDateMapper.map(valueModel.value);
  },

  set(value) {
    valueModel.value = optionalDateMapper.mapReverse(value);
  }
});
</script>