import { InputElement } from './inputElement';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { Action } from '@/modules/shared/types/action';
import type { Color } from '@/modules/uikit/types/color';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';

export abstract class InputElementBase<V> extends InputElement<V>
{
    private valueChangeEvent = new EntityEvent<V>();
    private disposeToken = new DisposeToken();

    protected abstract component: any;

    protected props: Record<string, any> = shallowReactive({
        id: undefined,
        name: undefined,
        value: this.getDefaultValue(),
        hasAutofocus: false,
        isDisabled: false,
        color: <Color | undefined>undefined,
        highlight: false,

        'onUpdate:value': (value: V) =>
        {
            this.value = value;
        }
    });

    readonly key = getUniqueId('input-base');

    get vnode()
    {
        return h(this.component, this.props);
    }

    get id(): string | undefined
    {
        return this.readField('id');
    }

    set id(value: string | undefined)
    {
        this.disposeToken.assertNotDisposed();
        this.writeField('id', value);
    }

    get name(): string | undefined
    {
        return this.readField('name');
    }

    set name(value: string | undefined)
    {
        this.disposeToken.assertNotDisposed();
        this.writeField('name', value);
    }

    get value(): V
    {
        return this.readField('value');
    }

    set value(value: V)
    {
        this.disposeToken.assertNotDisposed();

        const hasChanged = this.value !== value;

        if (hasChanged)
        {
            this.writeField('value', value);
            this.valueChangeEvent.emit(value);
        }
    }

    get hasAutofocus(): boolean
    {
        return this.readField('hasAutofocus');
    }

    set hasAutofocus(value: boolean)
    {
        this.disposeToken.assertNotDisposed();
        this.writeField('hasAutofocus', value);
    }

    get isDisabled(): boolean
    {
        return this.readField('isDisabled');
    }

    set isDisabled(value: boolean)
    {
        this.disposeToken.assertNotDisposed();
        this.writeField('isDisabled', value);
    }

    override disable(): void
    {
        this.disposeToken.assertNotDisposed();
        this.isDisabled = true;
    }

    override enable(): void
    {
        this.disposeToken.assertNotDisposed();
        this.isDisabled = false;
    }

    override toErrorMode(): void
    {
        this.disposeToken.assertNotDisposed();

        this.writeField<Color | undefined>('color', 'error');
        this.writeField<boolean>('highlight', true);
    }

    override toDefaultMode(): void
    {
        this.disposeToken.assertNotDisposed();

        this.writeField<Color | undefined>('color', undefined);
        this.writeField<boolean>('highlight', false);
    }

    override onValueChange(handler: Action<[value: V]>, disposeToken: DisposeToken): void
    {
        this.valueChangeEvent.on(handler, disposeToken);
    }

    override[Symbol.dispose](): void
    {
        if (this.disposeToken.isDisposed)
        {
            return;
        }

        this.valueChangeEvent[Symbol.dispose]();
        this.disposeToken[Symbol.dispose]();
    }

    protected abstract getDefaultValue(): V;

    protected readField<T>(name: string): T
    {
        return this.props[name];
    }

    protected writeField<T>(name: string, value: T)
    {
        this.props[name] = value;
    }
}