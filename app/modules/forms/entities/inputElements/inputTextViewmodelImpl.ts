import { UInput } from "#components";
import { InputViewmodelWithPlaceholder } from "./mixins/inputViewmodelWithPlaceholder";
import type { InputTextViewmodelData } from '../../../uikit/types/inputViewmodels/inputTextViewmodelData';
import { InputViewmodelNuxtUIBaseString, type InputViewmodelNuxtUIBaseStringProps } from "./base/inputViewmodelNuxtUIBaseString";
import type { InputTextViewmodel } from './inputTextViewmodel';

type InputViewmodelTextProps = InputViewmodelNuxtUIBaseStringProps & {
  placeholder: string;
};

export class InputTextViewmodelImpl extends InputViewmodelWithPlaceholder(InputViewmodelNuxtUIBaseString<InputViewmodelTextProps, InputTextViewmodelData>) implements InputTextViewmodel
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UInput, this.props);
    }
  };
}