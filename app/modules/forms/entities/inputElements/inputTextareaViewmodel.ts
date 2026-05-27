import type { InputTextareaViewmodelData } from '../../../uikit/types/inputViewmodels/inputTextareaViewmodelData';
import { InputElement } from './inputElement';

export abstract class InputTextareaViewmodel extends InputElement<string> implements InputTextareaViewmodelData
{
    abstract placeholder: string;
}