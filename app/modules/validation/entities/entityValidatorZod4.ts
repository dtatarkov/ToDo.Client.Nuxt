import { EntityValidator } from './entityValidator';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import type { EntityFieldScheme, EntityStringFieldScheme } from '@/modules/shared/types/entityFieldScheme';
import { EntityFieldType } from '@/modules/shared/enums/entityFieldType';
import { ValidationError } from './validationError';
import { z } from 'zod';

export class EntityValidatorZod4<TEntity extends Record<string, any>> extends EntityValidator<TEntity>
{
    private zodSchemas: Map<keyof TEntity, z.ZodType>;

    constructor(scheme: EntityScheme<TEntity>)
    {
        super();
        this.zodSchemas = this.buildSchemas(scheme);
    }

    override validateField<K extends keyof TEntity>(field: K, value: TEntity[K]): ValidationError | undefined
    {
        const zodSchema = this.zodSchemas.get(field);

        if (!zodSchema)
        {
            throw new Error(`Unknown field: ${String(field)}`);
        }

        const result = zodSchema.safeParse(value);

        if (!result.success)
        {
            const error = new ValidationError(result.error.issues[0]?.message ?? '');
            return error;
        }

        return undefined;
    }

    private buildSchemas(scheme: EntityScheme<TEntity>): Map<keyof TEntity, z.ZodType>
    {
        const schemas = new Map<keyof TEntity, z.ZodType>();

        for (const [key, fieldScheme] of Object.entries(scheme))
        {
            const zodSchema = this.createZodSchema(fieldScheme);
            schemas.set(key as keyof TEntity, zodSchema);
        }

        return schemas;
    }

    private createZodSchema(scheme: EntityFieldScheme): z.ZodType
    {
        switch (scheme.type)
        {
            case EntityFieldType.string:
                return this.createStringScheme(scheme);
            case EntityFieldType.datetime:
                return this.createDateTimeScheme();
            default:
                return this.createDefaultScheme();
        }
    }

    private createStringScheme(fieldScheme: EntityStringFieldScheme): z.ZodType
    {
        let result = z.string();

        if (fieldScheme.isRequired)
        {
            result = result.nonempty('Заполните значение');
        }

        return result;
    }

    private createDateTimeScheme(): z.ZodType
    {
        return z.date().optional();
    }

    private createDefaultScheme(): z.ZodType
    {
        return z.any();
    }
}