import { InputElement } from './inputElement';
import type { InputTimeData } from '../../types/inputTimeData';

export abstract class InputElementTime extends InputElement<number | undefined> implements InputTimeData
{
}