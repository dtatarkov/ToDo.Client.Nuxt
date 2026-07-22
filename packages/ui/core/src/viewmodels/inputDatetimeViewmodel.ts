import { InputBaseViewmodel, type InputBaseViewmodelState } from './inputBaseViewmodel';
import type { InputElementDateData } from '../types/inputElementDateData';

export type InputDatetimeViewmodelState = InputBaseViewmodelState<InputElementDateData, Date | undefined>;

export abstract class InputDatetimeViewmodel extends InputBaseViewmodel<Date | undefined, InputElementDateData, InputDatetimeViewmodelState>
{

}
