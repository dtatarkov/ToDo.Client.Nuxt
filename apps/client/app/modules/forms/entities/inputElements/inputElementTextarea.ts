import { InputElement, type InputElementData } from './inputElement';

export interface InputElementTextareaData extends InputElementData<string>
{
    placeholder: string;
};

export abstract class InputElementTextarea extends InputElement<string> implements InputElementTextareaData
{
    abstract placeholder: string;
}