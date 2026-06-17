import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormElementBase } from '../../entities/formElementBase';
import { FormFieldBase } from '../../entities/formFieldBase';
import { createInputElementTextMock } from '../../mocks/inputElementTextMock';
import { ValidationError } from '@/modules/shared/entities/validationError';
import { entityFieldSchemeMock } from '@/modules/shared/mocks/entityFieldSchemeMock';


describe('FormElementBase', () =>
{
    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('validate', () =>
    {
        it('should save ValidationError and set isValid to false when validation fails', () =>
        {
            const inputElement = createInputElementTextMock();

            const formField = new FormFieldBase();
            formField.name = 'testField';

            const error = new ValidationError('Field is required');
            entityFieldSchemeMock.validate.mockReturnValueOnce(error);

            const element = new FormElementBase(inputElement, formField, entityFieldSchemeMock);

            element.validate();

            expect(element.isValid()).toBe(false);
            expect(element.getError()).toBe(error);
        });

        it('should clear ValidationError and set isValid to true when validation passes', () =>
        {
            const inputElement = createInputElementTextMock();

            const formField = new FormFieldBase();
            formField.name = 'testField';

            const element = new FormElementBase(inputElement, formField, entityFieldSchemeMock);

            element.validate();

            expect(element.isValid()).toBe(true);
            expect(element.getError()).toBeUndefined();
        });

        it('should call inputElement.toErrorMode and formField.setError on validation failure', () =>
        {
            const inputElement = createInputElementTextMock();

            const formField = new FormFieldBase();
            formField.name = 'testField';

            const error = new ValidationError('Field is required');
            entityFieldSchemeMock.validate.mockReturnValueOnce(error);

            const element = new FormElementBase(inputElement, formField, entityFieldSchemeMock);

            element.validate();

            expect(inputElement.toErrorMode).toHaveBeenCalledTimes(1);
            expect(formField.getError()).toBe(error);
        });

        it('should call inputElement.toDefaultMode and formField.clearError on validation success', () =>
        {
            const inputElement = createInputElementTextMock();

            const formField = new FormFieldBase();
            formField.name = 'testField';

            entityFieldSchemeMock.validate
                .mockReturnValueOnce(new ValidationError('Field is required'))
                .mockReturnValueOnce(undefined);

            const element = new FormElementBase(inputElement, formField, entityFieldSchemeMock);

            element.validate();
            element.validate();

            expect(inputElement.toDefaultMode).toHaveBeenCalledTimes(1);
            expect(formField.getError()).toBeUndefined();
        });

        it('should set up input value tracking on first validation', () =>
        {
            const inputElement = createInputElementTextMock();

            const formField = new FormFieldBase();
            formField.name = 'testField';

            const element = new FormElementBase(inputElement, formField, entityFieldSchemeMock);

            element.validate();

            expect(inputElement.onValueChange).toHaveBeenCalledTimes(1);
        });

        it('should not set up input value tracking on subsequent validations', () =>
        {
            const inputElement = createInputElementTextMock();

            const formField = new FormFieldBase();
            formField.name = 'testField';

            const element = new FormElementBase(inputElement, formField, entityFieldSchemeMock);

            element.validate();
            element.validate();

            expect(inputElement.onValueChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('isValid', () =>
    {
        it('should return true when no validation has been performed', () =>
        {
            const inputElement = createInputElementTextMock();

            const formField = new FormFieldBase();
            formField.name = 'testField';

            const element = new FormElementBase(inputElement, formField, entityFieldSchemeMock);

            expect(element.isValid()).toBe(true);
        });
    });

    describe('getError', () =>
    {
        it('should return undefined when no validation has been performed', () =>
        {
            const inputElement = createInputElementTextMock();

            const formField = new FormFieldBase();
            formField.name = 'testField';

            const element = new FormElementBase(inputElement, formField, entityFieldSchemeMock);

            expect(element.getError()).toBeUndefined();
        });
    });
});