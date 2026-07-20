import { InputElement } from './inputElement';
import type { InputElementTimeData } from '../../types/inputElementTimeData';

export abstract class InputElementTime extends InputElement<number | undefined> implements InputElementTimeData
{
}