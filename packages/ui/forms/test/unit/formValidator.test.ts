import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FormValidatorBase } from '../../src/entities/formValidatorBase';
import { entitySchemeMock } from '@client/infrastructure-entity-schemes/mocks';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import { formDataContextMock } from '../mocks/formDataContextMock';
import type { FormElementViewmodel } from '../../src/viewmodels/formElementViewmodel';
import { createFormElementViewmodelMock } from '../mocks/formElementViewmodelMock';
import type { MessageKey } from '@client/infrastructure-messages';

function setupFormValidator(elements: FormElementViewmodel[], scheme?: EntityScheme<any, any>): FormValidatorBase
{
    return new FormValidatorBase(elements, formDataContextMock, scheme);
}

beforeEach(() =>
{
    vi.resetAllMocks();
});

describe('validate', () =>
{
    it('should validate all elements', () =>
    {
        const elements = [
            createFormElementViewmodelMock('title', { value: 'Initial Title' }),
            createFormElementViewmodelMock('description', { value: 'Initial Description' }),
        ];

        const formValidator = setupFormValidator(elements);

        formValidator.validate();

        elements.forEach(element =>
        {
            expect(element.validate).toHaveBeenCalledTimes(1);
        });
    });

    it('should return { isValid: true, messages: {} } when scheme is not provided', () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'Initial Title' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'Initial Description' });

        const elements = [titleElement, descriptionElement];

        const formValidator = setupFormValidator(elements);
        const result = formValidator.validate();

        expect(result.isValid).toBe(true);
        expect(result.messages).toEqual({});
    });

    it('should return { isValid: true, messages: {} } when scheme validation passes', () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'Initial Title' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'Initial Description' });

        const elements = [titleElement, descriptionElement];

        formDataContextMock.getData.mockReturnValue({
            title: 'Initial Title',
            description: 'Initial Description',
        });

        entitySchemeMock.validate.mockReturnValue({});

        const formValidator = setupFormValidator(elements, entitySchemeMock);
        const result = formValidator.validate();

        expect(result.isValid).toBe(true);
        expect(result.messages).toEqual({});
    });

    it('should return { isValid: false, messages } when scheme validation fails', () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'Initial Title' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'Initial Description' });

        const elements = [titleElement, descriptionElement];

        entitySchemeMock.validate.mockReturnValue({
            title: [{ messageKey: 'entity.field.required' }],
        });

        formDataContextMock.getData.mockReturnValue({
            title: '',
            description: 'Initial Description',
        });

        const formValidator = setupFormValidator(elements, entitySchemeMock);
        const result = formValidator.validate();

        expect(result.isValid).toBe(false);

        expect(result.messages).toEqual({
            title: [{ messageKey: <MessageKey>'entity.field.required' }]
        });
    });

    it('should return { isValid: false, messages } with errors from multiple fields', () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'Initial Title' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'Initial Description' });

        const elements = [titleElement, descriptionElement];

        entitySchemeMock.validate.mockReturnValue({
            title: [{ messageKey: 'entity.field.required' }],
            description: [{ messageKey: 'entity.field.required' }],
        });

        formDataContextMock.getData.mockReturnValue({
            title: '',
            description: '',
        });

        const formValidator = setupFormValidator(elements, entitySchemeMock);
        const result = formValidator.validate();

        expect(result.isValid).toBe(false);

        expect(result.messages).toEqual({
            title: [{ messageKey: <MessageKey>'entity.field.required' }],
            description: [{ messageKey: <MessageKey>'entity.field.required' }]
        });
    });
});

