import type { FormElementState } from './formElementState';

export type FormState = {
  elements: FormElementState[];
  isDisabled: boolean;
};

