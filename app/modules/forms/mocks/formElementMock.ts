import { vi } from 'vitest';
import type { FormElement } from '../entities/formElement';

export function createFormElementMock<V = unknown>(name: string, initialValue: V, validateResult: boolean = true): FormElement
{
    return {
        name,
        value: initialValue,
        validate: vi.fn(() => validateResult),
        disable: vi.fn(),
        enable: vi.fn(),
        key: `test-element-${name}`,
        vnode: {} as VNode,
        [Symbol.dispose]: vi.fn(),
    } satisfies FormElement;
}