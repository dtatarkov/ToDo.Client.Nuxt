import type { Action } from '@/modules/shared/types/action';
import { Viewmodel } from './viewmodel';

export type ButtonBaseViewmodelData = {
    isDisabled: boolean;
};

export type ButtonBaseViewmodelHandlers = {
    click: Action;
};

export abstract class ButtonBaseViewmodel extends Viewmodel<string>
{
    abstract isDisabled: boolean;
}