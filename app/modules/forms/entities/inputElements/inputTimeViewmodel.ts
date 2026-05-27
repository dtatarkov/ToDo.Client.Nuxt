import type { InputTimeViewmodelData } from '../../../uikit/types/inputViewmodels/inputTimeViewmodelData';
import { InputElement } from './inputElement';

export abstract class InputTimeViewmodel extends InputElement<number | undefined> implements InputTimeViewmodelData
{
}