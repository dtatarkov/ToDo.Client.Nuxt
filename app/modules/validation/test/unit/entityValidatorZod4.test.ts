import { describe, it, expect } from 'vitest';
import { EntityValidatorZod4 } from '../../entities/entityValidatorZod4';
import { ValidationError } from '../../entities/validationError';
import { EntityFieldType } from '@/modules/shared/enums/entityFieldType';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';

describe('EntityValidatorZod4', () =>
{
    describe('validateField', () =>
    {
        it('should return ValidationError for invalid required string field', () =>
        {
            const scheme: EntityScheme<any> = {
                title: {
                    type: EntityFieldType.string,
                    isRequired: true,
                },
            };

            const validator = new EntityValidatorZod4(scheme);
            const result = validator.validateField('title', '');

            expect(result).toBeInstanceOf(ValidationError);
            expect(result?.message).toBe('Заполните значение');
        });

        it('should return undefined for valid required string field', () =>
        {
            const scheme: EntityScheme<any> = {
                title: {
                    type: EntityFieldType.string,
                    isRequired: true,
                },
            };

            const validator = new EntityValidatorZod4(scheme);
            const result = validator.validateField('title', 'valid value');

            expect(result).toBeUndefined();
        });

        it('should return undefined for optional string field with empty value', () =>
        {
            const scheme: EntityScheme<any> = {
                title: {
                    type: EntityFieldType.string,
                    isRequired: false,
                },
            };

            const validator = new EntityValidatorZod4(scheme);
            const result = validator.validateField('title', '');

            expect(result).toBeUndefined();
        });

        it('should throw for unknown field', () =>
        {
            const scheme: EntityScheme<any> = {};

            const validator = new EntityValidatorZod4(scheme);

            expect(() => validator.validateField('unknown', 'value')).toThrow('Unknown field: unknown');
        });
    });
});