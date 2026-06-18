import { vi } from 'vitest';
import type { InputElementDateTime, InputElementDateTimeData } from '../entities/inputElements/inputElementDateTime';

export function createInputElementDateTimeMock(data?: Partial<InputElementDateTimeData>): InputElementDateTime
{
    return {
        name: data?.name ?? undefined,
        value: data?.value ?? undefined,
        id: data?.id ?? undefined,
        hasAutofocus: data?.hasAutofocus ?? false,
        isDisabled: data?.isDisabled ?? false,
        key: 'datetime-mock',
        vnode: {} as any,
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