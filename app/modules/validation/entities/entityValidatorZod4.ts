import { EntityValidator } from './entityValidator';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import type { EntityFieldScheme } from '@/modules/shared/types/entityFieldScheme';
import { EntityFieldType } from '@/modules/shared/enums/entityFieldType';
import { z } from 'zod';

export class EntityValidatorZod4<TEntity extends Record<string, any>> extends EntityValidator<TEntity>
{
    private zodSchemas: Map<keyof TEntity, z.ZodType>;

    constructor(scheme: EntityScheme<TEntity>)
    {
        super();
        this.zodSchemas = this.buildSchemas(scheme);
    }

    override validateField<K extends keyof TEntity>(field: K, value: TEntity[K]): string | undefined
    {
        const zodSchema = this.zodSchemas.get(field);

        if (!zodSchema)
        {
            throw new Error(`Unknown field: ${String(field)}`);
        }

        const result = zodSchema.safeParse(value);

        if (!result.success)
        {
            return result.error.issues[0]?.message ?? '';
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
                return this.createStringSchema();
            case EntityFieldType.datetime:
                return this.createDateTimeSchema();
            default:
                return this.createDefaultSchema();
        }
    }

    private createStringSchema(): z.ZodType
    {
        return z.string();
    }

    private createDateTimeSchema(): z.ZodType
    {
        return z.date().optional();
    }

    private createDefaultSchema(): z.ZodType
    {
        return z.any();
    }
}