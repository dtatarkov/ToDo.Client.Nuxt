import { InputBaseViewmodel, type InputBaseViewmodelState } from './inputBaseViewmodel';
import type { InputElementTimeData } from '../types/inputElementTimeData';

export type InputTimeViewmodelState = InputBaseViewmodelState<InputElementTimeData, number | undefined>;

export abstract class InputTimeViewmodel extends InputBaseViewmodel<number | undefined, InputElementTimeData, InputTimeViewmodelState>
{

}
