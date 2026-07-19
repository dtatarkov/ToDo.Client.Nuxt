import { vi } from 'vitest';
import type { InputElementTextarea, InputElementTextareaData } from '../../src/entities/inputElements/inputElementTextarea';

export function createInputElementTextareaMock(data?: Partial<InputElementTextareaData>): InputElementTextarea
{
    return {
        name: data?.name ?? undefined,
        value: data?.value ?? '',
        placeholder: data?.placeholder ?? '',
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