export class EntityFieldInvalidConfigurationException extends Error
{
    constructor(fieldName?: string)
    {
        super(fieldName ?
            `Invalid field "${fieldName}" configuration` :
            'Invalid field configuration'
        );
    }
}