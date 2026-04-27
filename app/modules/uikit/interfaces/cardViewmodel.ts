import { Viewmodel } from './viewmodel';

export abstract class CardViewmodel extends Viewmodel
{
    abstract title: string;
    abstract description: string;
    abstract actions: Viewmodel[];
    abstract footer: Viewmodel | undefined;
}