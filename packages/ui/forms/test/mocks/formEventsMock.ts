import { createEntityEventMock } from './entityEventMock';
import type { IFormEvents } from '../../src/entities/formEvents';

export const formEventsMock = {
    formValidationErrorEvent: createEntityEventMock(),
} satisfies IFormEvents;
