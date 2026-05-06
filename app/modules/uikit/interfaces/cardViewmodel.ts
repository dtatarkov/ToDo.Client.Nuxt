import { Viewmodel } from './viewmodel';
import type { ReactiveField } from '@/modules/shared/interfaces/reactiveField';

export abstract class CardViewmodel extends Viewmodel
{
    abstract readonly title: ReactiveField<string>;
    abstract readonly description: ReactiveField<string>;
    abstract readonly actions: ReactiveField<Viewmodel[]>;
    abstract readonly footer: ReactiveField<Viewmodel | undefined>;
}