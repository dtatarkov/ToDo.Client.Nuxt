import { vi } from 'vitest';
import type { InputElementTextarea } from '../../src/entities/inputElements/inputElementTextarea';
import type { InputElementTextareaData } from '../../src/types/inputElementTextareaData';

export function createInputElementTextareaMock(data?: Partial<InputElementTextareaData>): InputElementTextarea
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
    } satisfies InputElementTextarea;
}