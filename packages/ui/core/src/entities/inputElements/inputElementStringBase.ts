import { InputElementBase } from './inputElementBase';


export abstract class InputElementStringBase extends InputElementBase<string>
{
    protected override getDefaultValue(): string
    {
        return '';
    }
}