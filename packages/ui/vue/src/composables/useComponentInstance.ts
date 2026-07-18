import { getCurrentInstance, type ComponentInternalInstance } from 'vue';
import { ComponentContextNotAvailableException } from '../exceptions/componentContextNotAvailableException';

export function useComponentInstance(): ComponentInternalInstance
{
    const instance = getCurrentInstance();

    if (!instance)
    {
        throw new ComponentContextNotAvailableException();
    }

    return instance;
}