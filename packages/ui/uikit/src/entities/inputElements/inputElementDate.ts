import { InputElement } from './inputElement';
import type { InputDateData } from '../../types/inputDateData';

export abstract class InputElementDate extends InputElement<Date | undefined> implements InputDateData
{
}