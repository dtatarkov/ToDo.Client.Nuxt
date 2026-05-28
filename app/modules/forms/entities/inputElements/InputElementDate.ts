import { InputElement, type InputElementData } from './inputElement';

export interface InputElementDateData extends InputElementData<Date | undefined>
{
};

export abstract class InputElementDate extends InputElement<Date | undefined> implements InputElementDateData
{
}