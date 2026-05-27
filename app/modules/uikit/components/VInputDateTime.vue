<template>
    <div class="flex gap-1" v-bind="$attrs">
        <VInputDate 
            v-bind="props" 
            :id="inputDateId" 
            v-model:value="date" 
            :name="inputDateName" 
            class="w-full"
        />

        <VInputTime 
            v-bind="props" 
            :id="inputTimeId" 
            v-model:value="time" 
            :name="inputTimeName"
            :has-autofocus="false"
            class="w-full"
        />
    </div>
</template>

<script setup lang="ts">
import { DatesService } from '@/modules/shared/interfaces/datesService';
import VInputDate from './VInputDate.vue';
import VInputTime from './VInputTime.vue';
import { useService } from '@/modules/shared/composables/useService';
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import type { InputDateTimeData } from '@/modules/uikit/types/inputDateTimeData';

defineOptions({
  inheritAttrs: false
});

const datesService = useService(DatesService);
const stringsService = useService(StringsService);

const props = defineProps<InputDateTimeData>();
const valueModel = defineModel<Date>('value');

const date = shallowRef<Date>();
const time = shallowRef<number>();

const inputDatePostfix = 'date';
const inputTimePostfix = 'time';

const inputDateId = computed(() => stringsService.postfixNotEmpty(props.id, inputDatePostfix));
const inputTimeId = computed(() => stringsService.postfixNotEmpty(props.id, inputTimePostfix));

const inputDateName = computed(() => stringsService.postfixNotEmpty(props.name, inputDatePostfix));
const inputTimeName = computed(() => stringsService.postfixNotEmpty(props.name, inputTimePostfix));

watchEffect(() => {
    if(valueModel.value)
    {
        date.value = datesService.setTime(valueModel.value, 0);        
        time.value = datesService.getTime(valueModel.value);        
    }
    else {
        date.value = undefined;
        time.value = undefined;
    }
});

watchEffect(() => {
    if (date.value == undefined || time.value == undefined)
    {
      return;
    }

    const result = datesService.setTime(date.value, time.value);

    if(valueModel.value?.getTime() != result.getTime())
    {
        valueModel.value = result;
    }
});
</script>