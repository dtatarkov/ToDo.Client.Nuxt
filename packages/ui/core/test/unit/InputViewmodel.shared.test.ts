import { describe, it, expect, beforeEach } from 'vitest';
import { InputTextViewmodelImpl } from '../../src/viewmodels/inputTextViewmodelImpl';
import { InputTextareaViewmodelImpl } from '../../src/viewmodels/inputTextareaViewmodelImpl';
import { InputDateViewmodelImpl } from '../../src/viewmodels/inputDateViewmodelImpl';
import { InputTimeViewmodelImpl } from '../../src/viewmodels/inputTimeViewmodelImpl';
import { InputDatetimeViewmodelImpl } from '../../src/viewmodels/inputDatetimeViewmodelImpl';
import type { Constructor } from '@client/shared';
import type { InputBaseViewmodel, InputBaseViewmodelState } from '../../src/viewmodels/inputBaseViewmodel';
import type { InputElementData } from '../../src/types/inputElementData';

interface TestParams
{
    label: string;
    ViewmodelClass: Constructor<InputBaseViewmodel<any, InputElementData<any>, InputBaseViewmodelState<InputElementData<any>, any>>>;
    testData: { initialValue: any; newValue: any; };
}

const testCases: TestParams[] = [
    {
        label: 'InputTextViewmodelImpl',
        ViewmodelClass: InputTextViewmodelImpl,

        testData: {
            initialValue: '',
            newValue: 'test-value'
        },
    },

    {
        label: 'InputTextareaViewmodelImpl',
        ViewmodelClass: InputTextareaViewmodelImpl,

        testData: {
            initialValue: '',
            newValue: 'test-value'
        },
    },

    {
        label: 'InputDateViewmodelImpl',
        ViewmodelClass: InputDateViewmodelImpl,

        testData: {
            initialValue: undefined,
            newValue: new Date('07-20-2026')
        },
    },

    {
        label: 'InputTimeViewmodelImpl',
        ViewmodelClass: InputTimeViewmodelImpl,

        testData: {
            initialValue: undefined,
            newValue: 27000000 //07:30 },
        },
    },

    {
        label: 'InputDatetimeViewmodelImpl',
        ViewmodelClass: InputDatetimeViewmodelImpl,

        testData: {
            initialValue: undefined,
            newValue: new Date('07-20-2026 15:30:00')
        },
    }
];

describe.each(testCases)('$label', ({ ViewmodelClass, testData }) =>
{
    let viewmodel: InputBaseViewmodel<any, InputElementData<any>, InputBaseViewmodelState<InputElementData<any>, any>>;

    beforeEach(() =>
    {
        viewmodel = new ViewmodelClass();
    });

    describe('state', () =>
    {
        it('should initialize with empty name', () =>
        {
            expect(viewmodel.state.value.name).toBe('');
        });

        it('should initialize with empty value', () =>
        {
            expect(viewmodel.state.value.value).toBe(testData.initialValue);
        });
    });

    describe('setData', () =>
    {
        it('should update state with provided data', () =>
        {
            const data: InputElementData<any> = {
                name: 'test-input',
            };

            viewmodel.setData(data);

            expect(viewmodel.state.value).toEqual({
                value: testData.initialValue,
                ...data,
            });
        });

        it('should preserve value when setting data', () =>
        {
            viewmodel.value = testData.initialValue;

            const data: InputElementData<any> = {
                name: 'test-input',
            };

            viewmodel.setData(data);

            expect(viewmodel.state.value.value).toBe(testData.initialValue);
            expect(viewmodel.state.value.name).toBe('test-input');
        });

        it('should update name property in state', () =>
        {
            const data: InputElementData<any> = {
                name: 'new-name',
            };

            viewmodel.setData(data);

            expect(viewmodel.state.value.name).toBe('new-name');
        });
    });

    describe('value', () =>
    {
        it('should update value in state', () =>
        {
            viewmodel.value = testData.newValue;

            expect(viewmodel.state.value.value).toBe(testData.newValue);
        });

        it('should preserve data when setting value', () =>
        {
            const data: InputElementData<any> = {
                name: 'test-input',
            };

            viewmodel.setData(data);
            viewmodel.value = testData.newValue;

            expect(viewmodel.state.value.name).toBe('test-input');
            expect(viewmodel.state.value.value).toBe(testData.newValue);
        });
    });

    describe('name getter', () =>
    {
        it('should match state name', () =>
        {
            const data: InputElementData<any> = {
                name: 'matched-name',
            };

            viewmodel.setData(data);

            expect(viewmodel.name).toBe(viewmodel.state.value.name);
        });
    });
});
