import { createEntityEventMock } from './entityEventMock';
import type { FormEvents } from '../../src/entities/formEvents';
import { vi } from 'vitest';

export const formEventsMock = {
    formValidationErrorEvent: createEntityEventMock(),

    [Symbol.dispose]: vi.fn(),
} satisfies FormEvents;
