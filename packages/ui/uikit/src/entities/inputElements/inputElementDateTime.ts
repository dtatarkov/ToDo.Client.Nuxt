import { InputElement } from './inputElement';
import type { InputDateTimeData } from '../../types/inputDateTimeData';

export abstract class InputElementDateTime extends InputElement<Date | undefined> implements InputDateTimeData
{
}