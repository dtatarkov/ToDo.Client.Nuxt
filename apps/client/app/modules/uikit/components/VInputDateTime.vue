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
import VInputDate from './VInputDate.vue';
import VInputTime from './VInputTime.vue';
import type { InputDateTimeData } from '@/modules/uikit/types/inputDateTimeData';
import { postfixNotEmptyString } from '@/modules/shared/utils/postfixNotEmptyString';
import { setTime } from '@/modules/shared/utils/setTime';
import { getTime } from '@/modules/shared/utils/getTime';

defineOptions({
  inheritAttrs: false
});

const props = defineProps<InputDateTimeData>();
const valueModel = defineModel<Date>('value');

const date = shallowRef<Date>();
const time = shallowRef<number>();

const inputDatePostfix = 'date';
const inputTimePostfix = 'time';

const inputDateId = computed(() => postfixNotEmptyString(props.id, inputDatePostfix));
const inputTimeId = computed(() => postfixNotEmptyString(props.id, inputTimePostfix));

const inputDateName = computed(() => postfixNotEmptyString(props.name, inputDatePostfix));
const inputTimeName = computed(() => postfixNotEmptyString(props.name, inputTimePostfix));

watchEffect(() => {
    if(valueModel.value)
    {
        date.value = setTime(valueModel.value, 0);        
        time.value = getTime(valueModel.value);        
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

    const result = setTime(date.value, time.value);

    if(valueModel.value?.getTime() != result.getTime())
    {
        valueModel.value = result;
    }
});
</script>