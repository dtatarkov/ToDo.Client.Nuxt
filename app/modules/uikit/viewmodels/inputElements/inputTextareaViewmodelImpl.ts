import { UTextarea } from "#components";
import { InputViewmodelWithPlaceholder } from "./mixins/inputViewmodelWithPlaceholder";
import type { InputTextareaViewmodelData } from '../../types/inputViewmodels/inputTextareaViewmodelData';
import type { InputViewmodelTextData } from '../../types/inputViewmodels/inputViewmodelTextData';
import { InputViewmodelNuxtUIBaseString, type InputViewmodelNuxtUIBaseStringProps } from "./base/inputViewmodelNuxtUIBaseString";

type InputViewmodelTextareaProps = InputViewmodelNuxtUIBaseStringProps & {
  placeholder: string;
};

export class InputTextareaViewmodelImpl extends InputViewmodelWithPlaceholder(InputViewmodelNuxtUIBaseString<InputViewmodelTextareaProps, InputViewmodelTextData>) implements InputTextareaViewmodelData
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UTextarea, this.props);
    }
  };
}