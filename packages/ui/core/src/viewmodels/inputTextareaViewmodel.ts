import { InputBaseViewmodel, type InputBaseViewmodelState } from './inputBaseViewmodel';
import type { InputElementTextareaData } from '../types/inputElementTextareaData';

export type InputTextareaViewmodelState = InputBaseViewmodelState<InputElementTextareaData, string>;

export abstract class InputTextareaViewmodel extends InputBaseViewmodel<string, InputElementTextareaData, InputTextareaViewmodelState>
{

}
