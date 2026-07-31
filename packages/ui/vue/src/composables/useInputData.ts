import type { Color } from '@client/ui-core';
import { computed, type Reactive } from 'vue';
import type { InputData } from '../../../uikit/src/types/inputData';
export function useInputData(data: Reactive<InputData>)
{
    const hasError = computed(() => data.hasError ?? false);

    const color = computed<Color | undefined>(() => hasError.value ? 'error' : undefined);
    const shouldHighlight = computed(() => hasError.value);

    return {
        color,
        shouldHighlight,
    };
}