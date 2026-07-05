import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormElementBase } from '../../entities/formElementBase';
import { FormFieldBase } from '../../entities/formFieldBase';
import { createInputElementTextMock } from '../../mocks/inputElementTextMock';
import { ValidationError } from '@packages/shared';

describe('FormElementBase', () =>
{
    const validateFn = vi.fn();

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
            validateFn.mockReturnValueOnce(error);

            const element = new FormElementBase(inputElement, formField, validateFn);

            element.validate();

            expect(element.isValid()).toBe(false);
            expect(element.getError()?.message).toBe(error?.message);
        });

        it('should clear ValidationError and set isValid to true when validation passes', () =>
        {
            const inputElement = createInputElementTextMock();

            const formField = new FormFieldBase();
            formField.name = 'testField';

            const element = new FormElementBase(inputElement, formField, validateFn);

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
            validateFn.mockReturnValueOnce(error);

            const element = new FormElementBase(inputElement, formField, validateFn);

            element.validate();

            expect(inputElement.toErrorMode).toHaveBeenCalledTimes(1);
            expect(formField.getError()?.message).toBe(error.message);
        });

        it('should call inputElement.toDefaultMode and formField.clearError on validation success', () =>
        {
            const inputElement = createInputElementTextMock();

            const formField = new FormFieldBase();
            formField.name = 'testField';

            validateFn
                .mockReturnValueOnce(new ValidationError('Field is required'))
                .mockReturnValueOnce(undefined);

            const element = new FormElementBase(inputElement, formField, validateFn);

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

            const element = new FormElementBase(inputElement, formField, validateFn);

            element.validate();

            expect(inputElement.onValueChange).toHaveBeenCalledTimes(1);
        });

        it('should not set up input value tracking on subsequent validations', () =>
        {
            const inputElement = createInputElementTextMock();

            const formField = new FormFieldBase();
            formField.name = 'testField';

            const element = new FormElementBase(inputElement, formField, validateFn);

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

            const element = new FormElementBase(inputElement, formField, validateFn);

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

            const element = new FormElementBase(inputElement, formField, validateFn);

            expect(element.getError()).toBeUndefined();
        });
    });
});