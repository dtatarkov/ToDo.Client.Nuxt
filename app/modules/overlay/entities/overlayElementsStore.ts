import type { OverlayElement } from './overlayElement';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';

export abstract class OverlayElementsStore<T extends OverlayElement = OverlayElement> implements Disposable
{
    abstract getElements(): T[];
    abstract add(element: T): void;
    abstract remove(element: T): void;

    abstract onElementsChange(callback: Action<[T[]]>, disposeToken?: DisposeToken): void;

    abstract [Symbol.dispose](): void;
}