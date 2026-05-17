<template>
  <UInputDate
    :id="props.id" 
    v-model="date" 
    :name="props.name" 
    :autofocus="props.hasAutofocus" 
    :disabled="props.isDisabled" 
    :hide-time-zone="true"    
    granularity="day"
  />
</template>

<script setup lang="ts">
import { useService } from '@/modules/shared/composables/useService';
import { ZonedDateTimeMapper } from '@/modules/shared/interfaces/zonedDateTimeMapper';
import { OptionalValueMapper } from '@/modules/shared/mappers/optionalValueMapper';

defineOptions({
  inheritAttrs: false
});

type Props = {
  id?: string;
  name?: string;
  hasAutofocus?: boolean;
  isDisabled?: boolean;
  value?: Date;
}

const dateMapper = useService(ZonedDateTimeMapper);
const optionalDateMapper = new OptionalValueMapper(dateMapper);

const props = defineProps<Props>();
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