import { InputElement, type InputElementData } from './inputElement';

export interface InputElementDateTimeData extends InputElementData<Date | undefined>
{
};

export abstract class InputElementDateTime extends InputElement<Date | undefined> implements InputElementDateTimeData
{
}