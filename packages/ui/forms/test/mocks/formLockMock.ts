import { vi } from 'vitest';
import type { FormLock } from '../../src/entities/formLock';
import { FormDisabledException } from '../../src/exceptions/formDisabledException';

function createFormLockMock()
{
    const mock = {
        isDisabled: vi.fn(),
        enable: vi.fn(),
        disable: vi.fn(),
        assertNotDisabled: vi.fn(),

        markDisabled: function () 
        {
            this.isDisabled.mockReturnValue(true);

            this.assertNotDisabled.mockImplementation(() =>
            {
                throw new FormDisabledException();
            });
        }
    };

    const result = mock satisfies FormLock;

    return result;
}

export const formLockMock = createFormLockMock();
