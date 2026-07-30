import { vi } from 'vitest';
import type { FormLock } from '../../src/entities/formLock';
import { FormDisabledException } from '../../src/exceptions/formDisabledException';

export const formLockMock = {
    isDisabled: vi.fn(),
    enable: vi.fn(),
    disable: vi.fn(),
    assertNotDisabled: vi.fn(),
} satisfies FormLock;

export function markFormLockMockAsDisabled()
{
    formLockMock.isDisabled.mockReturnValue(true);

    formLockMock.assertNotDisabled.mockImplementation(() =>
    {
        throw new FormDisabledException();
    });
}
