import type { InjectionKey } from 'vue';
import { useComponentInstance } from './useComponentInstance';

export function useComponentData()
{
    const instance = useComponentInstance();

    function getData<T>(key: InjectionKey<T>): T | undefined
    {

        const data = (instance as any).provides[key] as T | undefined;

        return data;
    }

    function setData<T>(key: InjectionKey<T>, data: T)
    {
        const instance = useComponentInstance();

        (instance as any).provides[key] = data;
    }

    return { getData, setData };
}