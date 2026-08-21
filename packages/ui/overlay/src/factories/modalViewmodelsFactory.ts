import type { Viewmodel } from '@client/ui-core';
import type { ModalViewmodel } from '../viewmodels/modalViewmodel';
import type { ModalConfiguration } from '../types/modalConfiguration';

export abstract class ModalViewmodelsFactory
{
    abstract create<TContent extends Viewmodel<any> = Viewmodel<any>>(
        configuration: ModalConfiguration<TContent>
    ): ModalViewmodel<TContent>;
}
