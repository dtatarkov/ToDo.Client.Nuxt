import type { OverlayElement } from './overlayElement';
import type { DisposeToken, Action  } from '@packages/shared';


export abstract class OverlayElementsStore<T extends OverlayElement = OverlayElement> implements Disposable
{
    abstract getElements(): T[];
    abstract add(element: T): void;
    abstract remove(element: T): void;

    abstract onElementsChange(callback: Action<[T[]]>, disposeToken?: DisposeToken): void;

    abstract [Symbol.dispose](): void;
}