import type { InputTextViewmodelData } from '../../../uikit/types/inputViewmodels/inputTextViewmodelData';
import { InputElement } from './inputElement';

export abstract class InputTextViewmodel extends InputElement<string> implements InputTextViewmodelData
{
    abstract placeholder: string;
}