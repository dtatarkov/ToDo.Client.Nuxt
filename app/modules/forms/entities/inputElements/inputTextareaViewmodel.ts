import type { InputTextareaViewmodelData } from '../../../uikit/types/inputViewmodels/inputTextareaViewmodelData';
import { InputViewmodel } from './inputViewmodel';

export abstract class InputTextareaViewmodel extends InputViewmodel<string> implements InputTextareaViewmodelData
{
    abstract placeholder: string;
}