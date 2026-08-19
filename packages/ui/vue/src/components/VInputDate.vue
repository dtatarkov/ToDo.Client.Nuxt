<template>
  <UInputDate
    :id="props.id"
    v-model="date"
    :name="props.name"
    :autofocus="props.hasAutofocus"
    :disabled="props.isDisabled"
    :color="color"
    :highlight="shouldHighlight"
    :hide-time-zone="true"
    granularity="day"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { OptionalValueMapper  } from '@client/shared';
import { ZonedDateTimeMapper } from '@client/infrastructure-datetime';
import { useService } from '../composables/useService';
import { useInputData } from '../composables/useInputData';
import { computed } from 'vue';
import type { InputDateData } from '@client/ui-uikit';

defineOptions({
  inheritAttrs: false
});

const dateMapper = useService(ZonedDateTimeMapper);
const optionalDateMapper = new OptionalValueMapper(dateMapper);

const props = defineProps<Partial<InputDateData>>();
const valueModel = defineModel<Date>('value');

const { color, shouldHighlight } = useInputData(props);

const date = computed({
  get() {
    return optionalDateMapper.map(valueModel.value);
  },

  set(value) {
    valueModel.value = optionalDateMapper.mapReverse(value);
  }
});
</script>