import { UTextarea } from "#components";
import { InputViewmodelWithPlaceholder } from "./mixins/inputViewmodelWithPlaceholder";
import type { InputTextareaViewmodelData } from '../../types/inputViewmodels/inputTextareaViewmodelData';
import { InputViewmodelNuxtUIBaseString, type InputViewmodelNuxtUIBaseStringProps } from "./base/inputViewmodelNuxtUIBaseString";
import type { InputTextareaViewmodel } from '../../interfaces/inputTextareaViewmodel';

type InputViewmodelTextareaProps = InputViewmodelNuxtUIBaseStringProps & {
  placeholder: string;
};

export class InputTextareaViewmodelImpl extends InputViewmodelWithPlaceholder(InputViewmodelNuxtUIBaseString<InputViewmodelTextareaProps, InputTextareaViewmodelData>) implements InputTextareaViewmodel
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UTextarea, this.props);
    }
  };
}