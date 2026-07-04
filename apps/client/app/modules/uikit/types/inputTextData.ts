import type { InputData } from './inputData';


export type InputTextData = InputData<string> & {
    placeholder?: string;
};
