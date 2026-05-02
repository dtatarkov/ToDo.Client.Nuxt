import type { InputTextViewmodelData } from '../types/inputViewmodels/inputTextViewmodelData';
import { InputViewmodel } from './inputViewmodel';

export abstract class InputTextViewmodel extends InputViewmodel<string> implements InputTextViewmodelData
{
    abstract placeholder: string;
}