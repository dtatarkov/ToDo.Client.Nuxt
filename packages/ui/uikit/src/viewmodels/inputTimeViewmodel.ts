import { InputViewmodel } from './inputViewmodel';
import type { InputTimeData } from '../types/inputTimeData';
import type { InputTimeState } from '../types/InputTimeState';

export abstract class InputTimeViewmodel extends InputViewmodel<number | undefined, InputTimeData, InputTimeState>
{

}
