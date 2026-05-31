import { InputElement } from './inputElement';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { Color } from '@/modules/uikit/types/color';

export abstract class InputElementBase<V> extends InputElement<V>
{
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

    key = getUniqueId('input-base');

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
        this.writeField('id', value);
    }

    get name(): string | undefined
    {
        return this.readField('name');
    }

    set name(value: string | undefined)
    {
        this.writeField('name', value);
    }

    get value(): V
    {
        return this.readField('value');
    }

    set value(value: V)
    {
        this.writeField('value', value);
    }

    get hasAutofocus(): boolean
    {
        return this.readField('hasAutofocus');
    }

    set hasAutofocus(value: boolean)
    {
        this.writeField('hasAutofocus', value);
    }

    get isDisabled(): boolean
    {
        return this.readField('isDisabled');
    }

    set isDisabled(value: boolean)
    {
        this.writeField('isDisabled', value);
    }

    override disable(): void
    {
        this.isDisabled = true;
    }

    override enable(): void
    {
        this.isDisabled = false;
    }

    override toErrorMode(): void
    {
        this.writeField<Color | undefined>('color', 'error');
        this.writeField<boolean>('highlight', true);
    }

    override toDefaultMode(): void
    {
        this.writeField<Color | undefined>('color', undefined);
        this.writeField<boolean>('highlight', false);
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