import { describe, it, expect } from 'vitest';
import { FormFieldBase } from '../../entities/formFieldBase';
import { ValidationError } from '@client/shared';

describe('FormFieldBase', () =>
{
    describe('setError', () =>
    {
        it('should store ValidationError', () =>
        {
            const field = new FormFieldBase();
            const error = new ValidationError('Field is required');

            field.setError(error);

            expect(field.getError()).toBe(error);
        });

        it('should overwrite previous error', () =>
        {
            const field = new FormFieldBase();
            const firstError = new ValidationError('First error');
            const secondError = new ValidationError('Second error');

            field.setError(firstError);
            field.setError(secondError);

            expect(field.getError()).toBe(secondError);
        });
    });

    describe('clearError', () =>
    {
        it('should clear stored error', () =>
        {
            const field = new FormFieldBase();
            const error = new ValidationError('Field is required');

            field.setError(error);
            field.clearError();

            expect(field.getError()).toBeUndefined();
        });

        it('should be safe to call when no error is set', () =>
        {
            const field = new FormFieldBase();
            field.clearError();

            expect(field.getError()).toBeUndefined();
        });
    });

    describe('getError', () =>
    {
        it('should return undefined when no error has been set', () =>
        {
            const field = new FormFieldBase();

            expect(field.getError()).toBeUndefined();
        });
    });
});