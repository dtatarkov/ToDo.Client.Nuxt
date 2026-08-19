import { InputViewmodel } from './inputViewmodel';
import type { InputDateData } from '../types/inputDateData';

export abstract class InputDatetimeViewmodel extends InputViewmodel<Date | undefined, InputDateData>
{

}