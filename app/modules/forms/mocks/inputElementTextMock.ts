import { vi } from 'vitest';
import type { InputElementText, InputElementTextData } from '../entities/inputElements/inputElementText';

export function createInputElementTextMock(data?: Partial<InputElementTextData>): InputElementText
{
    return {
        name: data?.name ?? undefined,
        value: data?.value ?? '',
        placeholder: data?.placeholder ?? '',
        id: data?.id ?? undefined,
        hasAutofocus: data?.hasAutofocus ?? false,
        isDisabled: data?.isDisabled ?? false,
        key: 'input-text-mock',
        vnode: {} as any,
        disable: vi.fn(),
        enable: vi.fn(),
        toErrorMode: vi.fn(),
        toDefaultMode: vi.fn(),
        onValueChange: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies InputElementText;
}