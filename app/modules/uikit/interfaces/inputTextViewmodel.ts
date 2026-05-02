import type { InputViewmodelTextData } from '../types/inputViewmodels/inputViewmodelTextData';
import { InputViewmodel } from './inputViewmodel';

export abstract class InputTextViewmodel extends InputViewmodel<string> implements InputViewmodelTextData
{
    abstract placeholder: string;
}