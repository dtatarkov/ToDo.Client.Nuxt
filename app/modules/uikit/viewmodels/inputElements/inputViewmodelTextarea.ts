import { UTextarea } from "#components";
import { InputViewmodelWithPlaceholder } from "./mixins/inputViewmodelWithPlaceholder";
import type { InputViewmodelTextareaData } from '../../types/inputViewmodels/inputViewmodelTextareaData';
import type { InputViewmodelTextData } from '../../types/inputViewmodels/inputViewmodelTextData';
import { InputViewmodelNuxtUIBaseString, type InputViewmodelNuxtUIBaseStringProps } from "./base/inputViewmodelNuxtUIBaseString";

type InputViewmodelTextareaProps = InputViewmodelNuxtUIBaseStringProps & {
  placeholder: string;
};

export class InputViewmodelTextarea extends InputViewmodelWithPlaceholder(InputViewmodelNuxtUIBaseString<InputViewmodelTextareaProps, InputViewmodelTextData>) implements InputViewmodelTextareaData
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UTextarea, this.props);
    }
  };
}