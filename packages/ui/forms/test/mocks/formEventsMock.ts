import { createEntityEventMock } from './entityEventMock';
import type { FormEvents } from '../../src/entities/formEvents';

export const formEventsMock = {
    formValidationErrorEvent: createEntityEventMock(),
} satisfies FormEvents;
