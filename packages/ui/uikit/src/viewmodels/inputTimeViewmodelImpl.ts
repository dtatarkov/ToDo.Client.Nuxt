import { InputTimeViewmodel } from './inputTimeViewmodel';
import type { InputTimeData } from '../types/inputTimeData';
import type { InputTimeState } from '../types/InputTimeState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';

export class InputTimeViewmodelImpl extends InputViewmodelImpl<number | undefined, InputTimeData, InputTimeState> implements InputTimeViewmodel
{
    protected createScheme(): EntityScheme<InputTimeData, InputTimeState>
    {
        return this.withBaseScheme((scheme) => ({
            value: scheme.number(),
            id: scheme.string(),
        }));
    }

    protected getInitialData(): InputTimeData
    {
        return {};
    }

    protected getDefaultValue(): number | undefined
    {
        return undefined;
    }
}
