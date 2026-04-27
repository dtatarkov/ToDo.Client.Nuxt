import type { Subscribable } from '@/modules/shared/interfaces/subscribable';
import { Viewmodel } from './viewmodel';
import type { Destroyable } from '@/modules/shared/interfaces/destroyable';

export type ButtonBaseViewmodelData = {
    isDisabled: boolean;
};

export abstract class ButtonBaseViewmodel extends Viewmodel<string> implements Destroyable
{
    abstract isDisabled: boolean;

    abstract readonly click: Subscribable;

    abstract destroy(): void;
}