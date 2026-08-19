import { InputViewmodel } from './inputViewmodel';
import type { InputDateData } from '../types/inputDateData';

export abstract class InputDateViewmodel extends InputViewmodel<Date | undefined, InputDateData>
{

}