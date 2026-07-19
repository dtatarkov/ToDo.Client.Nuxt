import { EntityFieldSchemeBase } from './entityFieldSchemeBase';
import type { z } from 'zod';
import type { EntityFieldStringData } from '../types/entityFieldStringData';

export class EntityFieldStringScheme extends EntityFieldSchemeBase<string>
{
    private label: string;
    private placeholder: string;
    private isLong: boolean;

    constructor(zod4Scheme: z.ZodType<string>, data: EntityFieldStringData)
    {
        super(zod4Scheme);
        this.label = data.label;
        this.placeholder = data.placeholder;
        this.isLong = data.isLong;
    }

    // override getFormElementData(): FormElementCreateData
    // {
    //     if (this.isLong)
    //     {
    //         return {
    //             type: FormElementType.textarea,
    //             label: this.label,
    //             placeholder: this.placeholder,
    //             validate: value => this.validate(value),
    //         };
    //     }

    //     return {
    //         type: FormElementType.inputText,
    //         label: this.label,
    //         placeholder: this.placeholder,
    //         validate: value => this.validate(value),
    //     };
    // }
}