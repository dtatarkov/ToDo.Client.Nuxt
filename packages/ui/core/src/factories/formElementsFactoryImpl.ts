import type { FormElement } from '../entities/formElement';
import { dependency } from '@client/infrastructure-di';
import { InputElementsFactory } from './inputElementsFactory';
import { FormElementBase } from '../entities/formElementBase';
import { FormFieldBase } from '../entities/formFieldBase';
import type { FormElementsFactory } from './formElementsFactory';
import type { FormElementsCreateData } from '../types/formElementsCreateData';
import type { FormElementCreateData } from '../types/formElementCreateData';
import { FormElementType } from '../enums/formElementType';
import type { InputElement } from '../entities/inputElements/inputElement';

@dependency(InputElementsFactory)
export class FormElementsFactoryImpl implements FormElementsFactory
{
    constructor(
        private inputElementsFactory: InputElementsFactory,
    )
    {
    }

    createElements(data: FormElementsCreateData): FormElement[]
    {
        const elements: FormElement[] = [];

        for (const [key, elementData] of Object.entries(data))
        {
            const element = this.createFormElement(key, elementData);

            if (element)
            {
                elements.push(element);
            }
        }

        return elements;
    }

    private createFormElement(
        name: string,
        data: FormElementCreateData,
    ): FormElement | undefined
    {
        const inputElement = this.createFieldInputElement(name, data);

        if (!inputElement)
        {
            return undefined;
        }

        const formField = this.createFormField(name, data);
        const validateFn = data.validate ?? (() => undefined);
        const formElement = new FormElementBase<any>(inputElement, formField, validateFn);

        return formElement;
    }

    private createFormField(name: string, data: FormElementCreateData)
    {
        const formField = new FormFieldBase();
        formField.name = name;
        formField.label = data.label ?? '';

        return formField;
    }

    private createFieldInputElement(name: string, data: FormElementCreateData): InputElement | undefined
    {
        let inputElement: InputElement | undefined;

        switch (data.type)
        {
            case FormElementType.inputText:
                inputElement = this.inputElementsFactory.createInputText();
                break;

            case FormElementType.textarea:
                inputElement = this.inputElementsFactory.createTextarea();
                break;

            case FormElementType.inputDate:
                inputElement = this.inputElementsFactory.createInputDate();
                break;

            case FormElementType.inputTime:
                inputElement = this.inputElementsFactory.createInputTime();
                break;

            case FormElementType.inputDateTime:
                inputElement = this.inputElementsFactory.createInputDateTime();
                break;
        }

        if (inputElement)
        {
            inputElement.name = name;
            inputElement.setData(data);
        }

        return inputElement;
    }
}
