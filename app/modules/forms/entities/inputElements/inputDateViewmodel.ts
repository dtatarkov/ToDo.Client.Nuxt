import type { InputViewmodelDateData } from '../../../uikit/types/inputViewmodels/InputViewmodelDateData';
import { InputElement } from './inputElement';

export abstract class InputDateViewmodel extends InputElement<Date | undefined> implements InputViewmodelDateData
{
}