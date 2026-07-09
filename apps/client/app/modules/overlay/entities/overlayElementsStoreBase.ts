import { OverlayElementsStore } from './overlayElementsStore';
import type { OverlayElement } from './overlayElement';
import { EntityEvent, removeFromArray } from '@client/shared';
import type { DisposeToken, Action } from '@client/shared';


import { OverlayElementExceptionNotFound } from '../exceptions/overlayElementExceptionNotFound';
import { OverlayElementExceptionAlreadyAdded } from '../exceptions/overlayElementExceptionAlreadyAdded';

export abstract class OverlayElementsStoreBase<T extends OverlayElement> extends OverlayElementsStore<T>
{
    protected elements = new Array<T>();
    protected elementsChangeEvent = new EntityEvent<T[]>({ deferred: true });

    override getElements(): T[]
    {
        return this.elements;
    }

    override onElementsChange(callback: Action<[T[]]>, disposeToken?: DisposeToken): void
    {
        this.elementsChangeEvent.on(callback, disposeToken);
    }

    override add(element: T): void
    {
        this.assertElementIsNotAdded(element);

        this.elements.push(element);
        this.elementsChangeEvent.emit(this.elements);
    }

    override remove(element: T): void
    {
        this.assertElementIsAdded(element);

        removeFromArray(this.elements, element);
        this.elementsChangeEvent.emit(this.elements);
    }

    override[Symbol.dispose](): void
    {
        this.elementsChangeEvent[Symbol.dispose]();
    }

    protected assertElementIsAdded(element: T): void
    {
        if (!this.elements.includes(element))
        {
            throw new OverlayElementExceptionNotFound(element);
        }
    }

    protected assertElementIsNotAdded(element: T): void
    {
        if (this.elements.includes(element))
        {
            throw new OverlayElementExceptionAlreadyAdded(element);
        }
    }
}