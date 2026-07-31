import { InputViewmodel } from './inputViewmodel';
import type { InputDateData } from '../types/inputDateData';
import type { InputDateState } from '../types/InputDateState';

export abstract class InputDateViewmodel extends InputViewmodel<Date | undefined, InputDateData, InputDateState>
{

}
