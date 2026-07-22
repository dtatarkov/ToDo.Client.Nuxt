import { InputBaseViewmodel, type InputBaseViewmodelState } from './inputBaseViewmodel';
import type { InputElementDateData } from '../types/inputElementDateData';

export type InputDateViewmodelState = InputBaseViewmodelState<InputElementDateData, Date | undefined>;

export abstract class InputDateViewmodel extends InputBaseViewmodel<Date | undefined, InputElementDateData, InputDateViewmodelState>
{

}
