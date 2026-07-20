import { vi } from 'vitest';
import type { InputElementDateTime } from '../../src/entities/inputElements/inputElementDateTime';
import type { InputElementDateTimeData } from '../../src/types/inputElementDateTimeData';

export function createInputElementDateTimeMock(data?: Partial<InputElementDateTimeData>): InputElementDateTime
{
    return {
        name: data?.name ?? undefined,
        value: data?.value ?? undefined,
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
    } satisfies InputElementDateTime;
}