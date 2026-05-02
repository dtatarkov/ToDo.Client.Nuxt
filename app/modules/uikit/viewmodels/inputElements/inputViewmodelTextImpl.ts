import { UInput } from "#components";
import { InputViewmodelWithPlaceholder } from "./mixins/inputViewmodelWithPlaceholder";
import type { InputViewmodelTextData } from '../../types/inputViewmodels/inputViewmodelTextData';
import { InputViewmodelNuxtUIBaseString, type InputViewmodelNuxtUIBaseStringProps } from "./base/inputViewmodelNuxtUIBaseString";
import type { InputTextViewmodel } from '../../interfaces/inputTextViewmodel';

type InputViewmodelTextProps = InputViewmodelNuxtUIBaseStringProps & {
  placeholder: string;
};

export class InputViewmodelTextImpl extends InputViewmodelWithPlaceholder(InputViewmodelNuxtUIBaseString<InputViewmodelTextProps, InputViewmodelTextData>) implements InputTextViewmodel
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UInput, this.props);
    }
  };
}