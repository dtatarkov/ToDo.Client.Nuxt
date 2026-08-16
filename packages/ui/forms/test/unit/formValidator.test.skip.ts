import { describe, it, expect } from 'vitest';
import { FormValidatorBase } from '../../src/entities/formValidatorBase';
import { FormValidationError } from '../../src/entities/formValidationError';
import { FormElementValidationError } from '../../src/entities/formElementValidationError';
import { createFormElementMock, markFormElementInvalid, markFormElementValid } from '../mocks/formElementMock';
import { ObservableViewmodelState } from '@client/ui-core';
import { formStateMock } from '../mocks/formStateMock';
import type { FormElementViewmodel } from '../../src/viewmodels/formElementViewmodel';
import type { FormState } from '../../src/types/formState';

function setupFormValidator(elements: FormElementViewmodel[], state: ObservableViewmodelState<FormState>): FormValidatorBase
{
    return new FormValidatorBase(elements, state);
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

        it('should return { isValid: true } when all elements are valid', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];

            markFormElementValid(titleElement);
            markFormElementValid(descriptionElement);

            const formValidator = setupFormValidator(elements, formStateMock);
            const result = formValidator.validate();

            expect(result.isValid).toBe(true);
            expect(result.validationError).toBeUndefined();

            for (const element of formStateMock.value.elements)
            {
                expect(element.hasError).toEqual(false);
                expect(element.errorKey).toBeUndefined();
            }
        });

        it('should return { isValid: false, validationError } when elements are invalid', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];

            const titleError = new FormElementValidationError('title', 'Title', 'Title is required');
            const descriptionError = new FormElementValidationError('description', 'Description', 'Description is required');

            markFormElementInvalid(titleElement, titleError);
            markFormElementInvalid(descriptionElement, descriptionError);

            const formValidator = setupFormValidator(elements, formStateMock);
            const result = formValidator.validate();

            expect(result.isValid).toBe(false);
            expect(result.validationError).toBeInstanceOf(FormValidationError);
            expect(result.validationError!.errors).toEqual([titleError, descriptionError]);

            expect(formStateMock.update).toBeCalledWith(expect.objectContaining({
                errors: {
                    title: titleError,
                    description: descriptionError,
                }
            }));
        });

        it('should return { isValid: false } with partial errors when only some elements fail', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];

            const titleError = new FormElementValidationError('title', 'Title', 'Title is required');

            markFormElementInvalid(titleElement, titleError);
            markFormElementValid(descriptionElement);

            const formValidator = setupFormValidator(elements, formStateMock);
            const result = formValidator.validate();

            expect(result.isValid).toBe(false);
            expect(result.validationError).toBeInstanceOf(FormValidationError);
            expect(result.validationError?.errors).toEqual([titleError]);
        });
    });
});
