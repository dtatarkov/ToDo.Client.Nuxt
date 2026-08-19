import { InputElementBase } from './inputElementBase';
import type { InputElementHidden } from './inputElementHidden';

export class InputElementHiddenBase extends InputElementBase<any> implements InputElementHidden
{
    protected getDefaultValue(): any
    {
        return undefined;
    }
}
