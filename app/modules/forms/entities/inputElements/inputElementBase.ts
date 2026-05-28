import { InputElement } from './inputElement';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';

export abstract class InputElementBase<V> extends InputElement<V>
{
    protected data: Record<string, any> = {
        id: undefined,
        name: undefined,
        value: this.getDefaultValue(),
        hasAutofocus: false,
        isDisabled: false,
    };

    key = getUniqueId('input-base');

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

    protected abstract getDefaultValue(): V;

    protected readField<T>(name: string): T
    {
        return this.data[name];
    }

    protected writeField<T>(name: string, value: T)
    {
        this.data[name] = value;
    }
}