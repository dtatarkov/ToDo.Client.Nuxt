import type { Viewmodel } from '@client/ui-core';
import { useObservableReadonly } from './useObservableReadonly';

export function useViewmodel<T extends Record<string, any>>(viewmodel: Viewmodel<T>)
{
    const state = useObservableReadonly(viewmodel.state);

    return state;
}