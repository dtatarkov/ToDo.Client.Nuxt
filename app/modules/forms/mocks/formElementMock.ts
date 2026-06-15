import { vi } from 'vitest';
import type { FormElement } from '../entities/formElement';

export function createFormElementMock<V = unknown>(name: string, initialValue: V)
{
    return {
        name,
        label: '',
        value: initialValue,
        setDefaultValue: vi.fn(),
        validate: vi.fn(),
        isValid: vi.fn(),
        getError: vi.fn(),
        disable: vi.fn(),
        enable: vi.fn(),
        key: `test-element-${name}`,
        vnode: {} as VNode,
        [Symbol.dispose]: vi.fn(),
    } satisfies FormElement;
}