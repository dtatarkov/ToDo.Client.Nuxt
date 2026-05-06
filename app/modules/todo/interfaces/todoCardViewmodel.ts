import { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import type { ReactiveField } from '@/modules/shared/interfaces/reactiveField';
import type { ValueOrGetter } from '@/modules/shared/types/valueOrGetter';

export type ToDoCardViewmodelData = {
  id: ValueOrGetter<string>;
  title: ValueOrGetter<string>;
  description: ValueOrGetter<string>;
  completionDateActual?: ValueOrGetter<Date | undefined>;
  completionDatePlanned?: ValueOrGetter<Date | undefined>;
};

export abstract class ToDoCardViewmodel extends Viewmodel<string>
{
  abstract id: ReactiveField<string>;
  abstract title: ReactiveField<string>;
  abstract description: ReactiveField<string>;
  abstract completionDateActual: ReactiveField<Date | undefined>;
  abstract completionDatePlanned: ReactiveField<Date | undefined>;
}