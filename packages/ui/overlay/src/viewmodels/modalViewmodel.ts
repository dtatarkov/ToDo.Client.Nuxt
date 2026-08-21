import { Viewmodel } from '@client/ui-core';
import type { ModalData } from '../types/modalData';

export abstract class ModalViewmodel<TContentData>
    extends Viewmodel<ModalData<TContentData>>
{
    abstract enable(): void;
    abstract disable(): void;
}
