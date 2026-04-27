import type { Subscribable } from '@/modules/shared/interfaces/subscribable';
import type { ButtonViewmodelColor } from '../types/buttonViewmodelColor';
import { Viewmodel } from './viewmodel';
import type { Destroyable } from '@/modules/shared/interfaces/destroyable';

export abstract class ButtonViewmodel extends Viewmodel<string> implements Destroyable
{
    abstract title: string;
    abstract isDisabled: boolean;
    abstract isLoading: boolean;
    abstract color: ButtonViewmodelColor;
    abstract readonly click: Subscribable;
    abstract destroy(): void;
}