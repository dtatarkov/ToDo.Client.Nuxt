import { InputViewmodel } from './inputViewmodel';
import type { InputDateData } from '../types/inputDateData';
import type { InputDatetimeState } from '../types/InputDatetimeState';

export abstract class InputDatetimeViewmodel extends InputViewmodel<Date | undefined, InputDateData, InputDatetimeState>
{

}
