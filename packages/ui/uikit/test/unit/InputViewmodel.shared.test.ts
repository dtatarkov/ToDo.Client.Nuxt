import { describe, it, expect, beforeEach } from 'vitest';
import { InputTextViewmodelImpl } from '../../src/viewmodels/inputTextViewmodelImpl';
import { InputTextareaViewmodelImpl } from '../../src/viewmodels/inputTextareaViewmodelImpl';
import { InputDateViewmodelImpl } from '../../src/viewmodels/inputDateViewmodelImpl';
import { InputTimeViewmodelImpl } from '../../src/viewmodels/inputTimeViewmodelImpl';
import { InputDatetimeViewmodelImpl } from '../../src/viewmodels/inputDatetimeViewmodelImpl';
import { InputHiddenViewmodelImpl } from '../../src/viewmodels/inputHiddenViewmodelImpl';
import type { Constructor } from '@client/shared';
import type { InputViewmodel } from '../../src/viewmodels/inputViewmodel';
import type { InputData } from '../../src/types/inputData';

interface TestParams
{
    label: string;
    ViewmodelClass: Constructor<InputViewmodel<any, InputData>>;
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
            newValue: 27000000 // 07:30
        },
    },

    {
        label: 'InputDatetimeViewmodelImpl',
        ViewmodelClass: InputDatetimeViewmodelImpl,

        testData: {
            initialValue: undefined,
            newValue: new Date('07-20-2026 15:30:00')
        },
    },

    {
        label: 'InputHiddenViewmodelImpl',
        ViewmodelClass: InputHiddenViewmodelImpl,

        testData: {
            initialValue: undefined,
            newValue: 'hidden-value'
        },
    }
];

describe.each(testCases)('$label', ({ ViewmodelClass, testData }) =>
{
    let viewmodel: InputViewmodel<any, InputData>;

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

        it('should initialize with default value', () =>
        {
            expect(viewmodel.state.value.value).toBe(testData.initialValue);
        });

        it('should initialize with isDisabled false', () =>
        {
            expect(viewmodel.state.value.isDisabled).toBe(false);
        });

        it('should initialize with hasAutofocus false', () =>
        {
            expect(viewmodel.state.value.hasAutofocus).toBe(false);
        });

        it('should initialize with hasError false', () =>
        {
            expect(viewmodel.state.value.hasError).toBe(false);
        });
    });

    describe('getters', () =>
    {
        it('should match state name', () =>
        {
            const targetName = 'matched-name';
            const data: InputData = { name: targetName };

            viewmodel.setData(data);

            expect(viewmodel.state.value.name).toBe(targetName);
            expect(viewmodel.name).toBe(viewmodel.state.value.name);
        });

        it('should match state isDisabled', () =>
        {
            viewmodel.disable();

            expect(viewmodel.state.value.isDisabled).toBe(true);
            expect(viewmodel.isDisabled).toBe(viewmodel.state.value.isDisabled);
        });

        it('should match state hasError', () =>
        {
            viewmodel.toErrorMode();

            expect(viewmodel.state.value.hasError).toBe(true);
            expect(viewmodel.hasError).toBe(viewmodel.state.value.hasError);
        });
    });

    describe('setData', () =>
    {
        it('should update state with provided data', () =>
        {
            const data: InputData = {
                name: 'test-input',
            };

            viewmodel.setData(data);

            expect(viewmodel.state.value.name).toBe('test-input');
        });

        it('should preserve value when setting data', () =>
        {
            viewmodel.value = testData.initialValue;

            const data: InputData = {
                name: 'test-input',
            };

            viewmodel.setData(data);

            expect(viewmodel.state.value.value).toBe(testData.initialValue);
            expect(viewmodel.state.value.name).toBe('test-input');
        });

        it('should preserve disabled state when setting data', () =>
        {
            viewmodel.disable();

            const data: InputData = {
                name: 'test-input',
            };

            viewmodel.setData(data);

            expect(viewmodel.state.value.isDisabled).toBe(true);
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
            const data: InputData = {
                name: 'test-input',
            };

            viewmodel.setData(data);
            viewmodel.value = testData.newValue;

            expect(viewmodel.state.value.name).toBe('test-input');
            expect(viewmodel.state.value.value).toBe(testData.newValue);
        });
    });

    describe('disable / enable', () =>
    {
        it('should disable the input', () =>
        {
            viewmodel.disable();

            expect(viewmodel.isDisabled).toBe(true);
            expect(viewmodel.state.value.isDisabled).toBe(true);
        });

        it('should enable the input', () =>
        {
            viewmodel.disable();
            viewmodel.enable();

            expect(viewmodel.isDisabled).toBe(false);
            expect(viewmodel.state.value.isDisabled).toBe(false);
        });
    });

    describe('toErrorMode / toDefaultMode', () =>
    {
        it('should set error mode', () =>
        {
            viewmodel.toErrorMode();

            expect(viewmodel.hasError).toBe(true);
            expect(viewmodel.state.value.hasError).toBe(true);
        });

        it('should clear error mode', () =>
        {
            viewmodel.toErrorMode();
            viewmodel.toDefaultMode();

            expect(viewmodel.hasError).toBe(false);
            expect(viewmodel.state.value.hasError).toBe(false);
        });
    });

    describe('setDefaultValue', () =>
    {
        it('should reset value to default', () =>
        {
            viewmodel.value = testData.newValue;
            viewmodel.setDefaultValue();

            expect(viewmodel.state.value.value).toBe(testData.initialValue);
        });
    });
});
