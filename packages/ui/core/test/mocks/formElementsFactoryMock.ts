import { vi } from 'vitest';
import type { FormElementsFactory } from '../../src/factories/formElementsFactory';
import type { FormElement } from '../../src/entities/formElement';

export function createFormElementsFactoryMock(elements: FormElement[]): FormElementsFactory
{
    return {
        createElements: vi.fn(() => elements),
    } satisfies FormElementsFactory;
}