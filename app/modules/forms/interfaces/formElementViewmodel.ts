import { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';

export abstract class FormElementViewmodel<V = any> extends Viewmodel<string>
{
  abstract name: string;
  abstract value: V;

  abstract disable(): void;
  abstract enable(): void;
}