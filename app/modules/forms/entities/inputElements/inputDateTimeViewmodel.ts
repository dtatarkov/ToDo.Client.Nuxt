import type { InputDateTimeViewmodelData } from '../../../uikit/types/inputViewmodels/inputDateTimeViewmodelData';
import { InputElement } from './inputElement';

export abstract class InputDateTimeViewmodel extends InputElement<Date | undefined> implements InputDateTimeViewmodelData
{
}