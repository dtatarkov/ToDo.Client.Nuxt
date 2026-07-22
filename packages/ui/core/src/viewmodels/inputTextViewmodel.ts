import { InputBaseViewmodel, type InputBaseViewmodelState } from './inputBaseViewmodel';
import type { InputElementTextData } from '../types/inputElementTextData';

export type InputTextViewmodelState = InputBaseViewmodelState<InputElementTextData, string>;

export abstract class InputTextViewmodel extends InputBaseViewmodel<string, InputElementTextData, InputTextViewmodelState>
{

}
