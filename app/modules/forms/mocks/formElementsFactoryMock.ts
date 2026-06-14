import { vi } from 'vitest';
import type { FormElementsFactory } from '../factories/formElementsFactory';
import type { FormElement } from '../entities/formElement';

export function createFormElementsFactoryMock(elements: FormElement[]): FormElementsFactory
{
    return {
        createElements: vi.fn(() => elements),
    } satisfies FormElementsFactory;
}