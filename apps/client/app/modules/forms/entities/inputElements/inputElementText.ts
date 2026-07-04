import { InputElement, type InputElementData } from './inputElement';

export interface InputElementTextData extends InputElementData<string>
{
    placeholder: string;
};

export abstract class InputElementText extends InputElement<string> implements InputElementTextData
{
    abstract placeholder: string;
}