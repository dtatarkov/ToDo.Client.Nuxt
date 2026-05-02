import type { InputDateTimeViewmodelData } from '../types/inputViewmodels/inputDateTimeViewmodelData';
import { InputViewmodel } from './inputViewmodel';

export abstract class InputDateTimeViewmodel extends InputViewmodel<Date | undefined> implements InputDateTimeViewmodelData
{
}