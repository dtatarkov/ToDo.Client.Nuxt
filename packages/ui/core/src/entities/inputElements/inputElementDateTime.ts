import { InputElement } from './inputElement';
import type { InputElementDateTimeData } from '../../types/inputElementDateTimeData';

export abstract class InputElementDateTime extends InputElement<Date | undefined> implements InputElementDateTimeData
{
}