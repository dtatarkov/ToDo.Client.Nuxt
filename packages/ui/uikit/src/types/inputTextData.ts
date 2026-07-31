import type { InputData } from './inputData';
import type { InputWithPlaceholderData } from './inputWithPlaceholderData';

export type InputTextData = InputData<string> & InputWithPlaceholderData;
