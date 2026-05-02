import type { InputViewmodelDateData } from '../types/inputViewmodels/InputViewmodelDateData';
import { InputViewmodel } from './inputViewmodel';

export abstract class InputDateViewmodel extends InputViewmodel<Date | undefined> implements InputViewmodelDateData
{
}