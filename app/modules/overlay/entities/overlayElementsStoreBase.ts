import { OverlayElementsStore } from './overlayElementsStore';
import type { OverlayElement } from './overlayElement';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';
import { removeFromArray } from '@/modules/shared/utils/removeFromArray';
import { OverlayElementNotFoundException } from '../exceptions/overlayElementNotFoundException';
import { OverlayElementAlreadyAddedException } from '../exceptions/overlayElementAlreadyAddedException';

export abstract class OverlayElementsStoreBase<T extends OverlayElement> extends OverlayElementsStore<T>
{
    protected elements = new Array<T>();
    protected elementsChangeEvent = new EntityEvent<T[]>();

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
            const exception = new OverlayElementNotFoundException();
            console.error(exception.message, element);
            throw exception;
        }
    }

    protected assertElementIsNotAdded(element: T): void
    {
        if (this.elements.includes(element))
        {
            const exception = new OverlayElementAlreadyAddedException();
            console.error(exception.message, element);
            throw exception;
        }
    }
}