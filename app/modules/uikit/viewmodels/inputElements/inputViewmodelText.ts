import { UInput } from "#components";
import { InputViewmodelWithPlaceholder } from "./mixins/inputViewmodelWithPlaceholder";
import type { InputViewmodelTextData } from '../../types/inputViewmodels/inputViewmodelTextData';
import { InputViewmodelNuxtUIBaseString, type InputViewmodelNuxtUIBaseStringProps } from "./base/inputViewmodelNuxtUIBaseString";

type InputViewmodelTextProps = InputViewmodelNuxtUIBaseStringProps & {
  placeholder: string;
};

export class InputViewmodelText extends InputViewmodelWithPlaceholder(InputViewmodelNuxtUIBaseString<InputViewmodelTextProps, InputViewmodelTextData>) implements InputViewmodelTextData
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UInput, this.props);
    }
  };
}