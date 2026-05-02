import type { InputTimeViewmodelData } from '../types/inputViewmodels/inputTimeViewmodelData';
import { InputViewmodel } from './inputViewmodel';

export abstract class InputTimeViewmodel extends InputViewmodel<number | undefined> implements InputTimeViewmodelData
{
}