import type { FormElement } from '../entities/formElement';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { InputElement } from '@/modules/forms/entities/inputElements/inputElement';
import { InputElementsFactory } from './inputElementsFactory';
import { FormElementBase } from '../entities/formElementBase';
import { FormFieldBase } from '../entities/formFieldBase';
import type { FormElementsFactory } from './formElementsFactory';
import type { EntityScheme } from '@/modules/shared/entities/entityScheme';
import type { EntityFieldScheme } from '@/modules/shared/entities/EntityFieldScheme';
import { EntityFieldDateTimeScheme } from '@/modules/shared/entities/entityFieldDateTimeScheme';
import { EntityFieldStringScheme } from '@/modules/shared/entities/entityFieldStringScheme';

@dependency(InputElementsFactory)
export class FormElementsFactoryImpl implements FormElementsFactory
{
    constructor(
        private inputElementsFactory: InputElementsFactory,
    )
    {
    }

    createElements<TEntity extends Record<string, any>>(
        scheme: EntityScheme<TEntity>
    ): FormElement[]
    {
        const elements: FormElement[] = [];

        for (const [key, fieldScheme] of Object.entries(scheme.fields))
        {
            const element = this.createFormElement(key, fieldScheme);

            if (element)
            {
                elements.push(element);
            }
        }

        return elements;
    }

    private createFormElement(
        name: string,
        fieldScheme: EntityFieldScheme,
    ): FormElement | undefined
    {
        const inputElement = this.createFieldInputElement(name, fieldScheme);

        if (!inputElement)
        {
            return undefined;
        }

        const formField = this.createFormField(name, fieldScheme);
        const formElement = new FormElementBase(inputElement, formField, fieldScheme);

        return formElement;
    }

    private createFormField(name: string, fieldScheme: EntityFieldScheme)
    {
        const formField = new FormFieldBase();
        formField.name = name;
        formField.label = (fieldScheme as { label?: string; }).label ?? '';

        return formField;
    }

    private createFieldInputElement(name: string, fieldScheme: EntityFieldScheme): InputElement | undefined
    {
        let inputElement: InputElement | undefined = undefined;

        if (fieldScheme instanceof EntityFieldStringScheme)
        {
            inputElement = this.createStringFieldInputElement(fieldScheme);
        }
        else if (fieldScheme instanceof EntityFieldDateTimeScheme)
        {
            inputElement = this.createInputDateTime();
        }

        if (inputElement)
        {
            inputElement.name = name;
        }

        return inputElement;
    }

    private createStringFieldInputElement(fieldScheme: EntityFieldStringScheme): InputElement
    {
        return fieldScheme.isLong
            ? this.createTextarea(fieldScheme)
            : this.createInputText(fieldScheme);
    }

    private createInputText(fieldScheme: EntityFieldStringScheme): InputElement
    {
        const inputElement = this.inputElementsFactory.createInputText();

        if (fieldScheme.placeholder)
        {
            inputElement.placeholder = fieldScheme.placeholder;
        }

        return inputElement;
    }

    private createTextarea(fieldScheme: EntityFieldStringScheme): InputElement
    {
        const inputElement = this.inputElementsFactory.createTextarea();

        if (fieldScheme.placeholder)
        {
            inputElement.placeholder = fieldScheme.placeholder;
        }

        return inputElement;
    }

    private createInputDateTime(): InputElement
    {
        const inputElement = this.inputElementsFactory.createInputDateTime();

        return inputElement;
    }
}
