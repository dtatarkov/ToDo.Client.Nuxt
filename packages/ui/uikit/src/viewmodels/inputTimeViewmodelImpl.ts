import { InputTimeViewmodel } from './inputTimeViewmodel';
import type { InputTimeData } from '../types/inputTimeData';
import type { InputTimeState } from '../types/InputTimeState';
import type { InputStateInitial } from '../types/InputState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';

export class InputTimeViewmodelImpl extends InputViewmodelImpl<number | undefined, InputTimeData, InputTimeState> implements InputTimeViewmodel
{
    protected createScheme(): EntityScheme<InputTimeState>
    {
        return this.withBaseScheme((scheme) => ({
            value: scheme.number().required(),
            id: scheme.string(),
        }));
    }

    protected getInitialState(): InputStateInitial<InputTimeState, number | undefined>
    {
        return {};
    }

    protected getDefaultValue(): number | undefined
    {
        return undefined;
    }
}
