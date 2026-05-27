import { Viewmodel } from "@/modules/uikit/interfaces/viewmodel";

export abstract class FormField extends Viewmodel<string>
{
  abstract name: string;
  abstract label: string;
  abstract content: Viewmodel | undefined;
}