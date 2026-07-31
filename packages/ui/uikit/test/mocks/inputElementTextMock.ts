import { vi } from 'vitest';
import type { InputElementText } from '../../src/entities/inputElements/inputElementText';
import type { InputTextData } from '../../src/types/inputTextData';

export function createInputElementTextMock(data?: Partial<InputTextData>): InputElementText
{
    return {
        name: data?.name ?? undefined,
        value: data?.value ?? '',
        placeholderKey: data?.placeholderKey,
        id: data?.id ?? undefined,
        hasAutofocus: data?.hasAutofocus ?? false,
        isDisabled: data?.isDisabled ?? false,
        disable: vi.fn(),
        enable: vi.fn(),
        setDefaultValue: vi.fn(),
        setData: vi.fn(),
        toErrorMode: vi.fn(),
        toDefaultMode: vi.fn(),
        onValueChange: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies InputElementText;
}