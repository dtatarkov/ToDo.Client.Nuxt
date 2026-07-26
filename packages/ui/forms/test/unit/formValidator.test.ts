import { describe, it, expect } from 'vitest';
import { FormValidator } from '../../src/entities/formValidator';
import { FormValidationError } from '../../src/entities/formValidationError';
import { FormElementValidationError } from '../../src/entities/formElementValidationError';
import type { FormViewmodelState } from '../../src/types/formViewmodelState';
import { createFormElementMock, markFormElementInvalid, markFormElementValid } from '../mocks/formElementMock';
import { ObservableViewmodelState } from '@client/ui-core';
import type { FormElement } from '../../src/entities/formElement';
import { formStateMock } from '../mocks/formStateMock';

function setupFormValidator(elements: FormElement[], state: ObservableViewmodelState<FormViewmodelState<any>>): FormValidator
{
    return new FormValidator(elements, state);
}

describe('FormValidator', () =>
{
    describe('validate', () =>
    {
        it('should validate all elements', () =>
        {
            const elements = [
                createFormElementMock('title', 'Initial Title'),
                createFormElementMock('description', 'Initial Description'),
            ];

            const formValidator = setupFormValidator(elements, formStateMock);

            formValidator.validate();

            elements.forEach(element =>
            {
                expect(element.validate).toHaveBeenCalledTimes(1);
            });
        });

        it('should update state with empty errors when all elements are valid', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];

            markFormElementValid(titleElement);
            markFormElementValid(descriptionElement);

            const formValidator = setupFormValidator(elements, formStateMock);

            formValidator.validate();

            expect(formStateMock.value.errors).toEqual({});
        });

        it('should update state with validation errors when elements are invalid', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];

            const titleError = new FormElementValidationError('title', 'Title', 'Title is required');
            const descriptionError = new FormElementValidationError('description', 'Description', 'Description is required');

            markFormElementInvalid(titleElement, titleError);
            markFormElementInvalid(descriptionElement, descriptionError);

            const formValidator = setupFormValidator(elements, formStateMock);

            formValidator.validate();

            expect(formStateMock.update).toBeCalledWith(expect.objectContaining({
                errors: {
                    title: titleError,
                    description: descriptionError,
                }
            }));
        });

        it('should update validationError property with FormValidationError', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];

            const titleError = new FormElementValidationError('title', 'Title', 'Title is required');
            const descriptionError = new FormElementValidationError('description', 'Description', 'Description is required');

            markFormElementInvalid(titleElement, titleError);
            markFormElementInvalid(descriptionElement, descriptionError);

            const formValidator = setupFormValidator(elements, formStateMock);

            formValidator.validate();

            expect(formValidator.validationError).toBeInstanceOf(FormValidationError);
            expect(formValidator.validationError?.errors).toEqual([titleError, descriptionError]);
        });

        it('should set validationError to undefined when all elements are valid', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];

            markFormElementValid(titleElement);
            markFormElementValid(descriptionElement);

            const formValidator = setupFormValidator(elements, formStateMock);

            formValidator.validate();

            expect(formValidator.validationError).toBeUndefined();
        });

        it('should handle partial validation errors', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];

            const titleError = new FormElementValidationError('title', 'Title', 'Title is required');

            markFormElementInvalid(titleElement, titleError);
            markFormElementValid(descriptionElement);

            const formValidator = setupFormValidator(elements, formStateMock);

            formValidator.validate();

            expect(formValidator.validationError).toBeInstanceOf(FormValidationError);
            expect(formValidator.validationError?.errors).toEqual([titleError]);
        });
    });

    describe('isValid', () =>
    {
        it('should return true when all elements are valid', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];

            markFormElementValid(titleElement);
            markFormElementValid(descriptionElement);

            const formValidator = setupFormValidator(elements, formStateMock);

            expect(formValidator.isValid()).toBe(true);
        });

        it('should return false when any element is invalid', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];

            const titleError = new FormElementValidationError('title', 'Title', 'Title is required');

            markFormElementInvalid(titleElement, titleError);
            markFormElementValid(descriptionElement);

            const formValidator = setupFormValidator(elements, formStateMock);

            expect(formValidator.isValid()).toBe(false);
        });

        it('should return false when all elements are invalid', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];

            const titleError = new FormElementValidationError('title', 'Title', 'Title is required');
            const descriptionError = new FormElementValidationError('description', 'Description', 'Description is required');

            markFormElementInvalid(titleElement, titleError);
            markFormElementInvalid(descriptionElement, descriptionError);

            const formValidator = setupFormValidator(elements, formStateMock);

            expect(formValidator.isValid()).toBe(false);
        });
    });
});
