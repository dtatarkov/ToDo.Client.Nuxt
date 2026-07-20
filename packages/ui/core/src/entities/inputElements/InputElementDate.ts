import { InputElement } from './inputElement';
import type { InputElementDateData } from '../../types/inputElementDateData';

export abstract class InputElementDate extends InputElement<Date | undefined> implements InputElementDateData
{
}