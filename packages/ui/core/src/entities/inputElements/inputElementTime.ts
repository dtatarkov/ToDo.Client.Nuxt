import { InputElement, type InputElementData } from './inputElement';

export interface InputElementTimeData extends InputElementData<number | undefined>
{
};

export abstract class InputElementTime extends InputElement<number | undefined> implements InputElementTimeData
{
}