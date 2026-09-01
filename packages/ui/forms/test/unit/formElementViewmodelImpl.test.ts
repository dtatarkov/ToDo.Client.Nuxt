import { describe, it, expect } from 'vitest';
import { FormElementViewmodelImpl } from '../../src/viewmodels/formElementViewmodelImpl';
import { createInputViewmodelMock } from '@client/ui-uikit/mocks';
import { InputType, type InputData } from '@client/ui-uikit';

function setupViewmodels(state: InputData<string>)
{
    const inputViewmodelMock = createInputViewmodelMock(state);
    const formElementViewmodel = new FormElementViewmodelImpl(inputViewmodelMock);

    return {
        inputViewmodelMock,
        formElementViewmodel
    };
}

describe('constructor', () =>
{
    it('should create initial state with input vm state and undefined labelKey/errorKey', () =>
    {
        const { formElementViewmodel } = setupViewmodels({
            id: 'title',
            name: 'title',
            value: 'initial-value',
            isDisabled: false,
            hasError: false,
            hasAutofocus: false,
        });

        expect(formElementViewmodel.state.value).toEqual({
            labelKey: undefined,
            errorKey: undefined,
            inputType: InputType.inputText,
            id: 'title',
            name: 'title',
            value: 'initial-value',
            isDisabled: false,
            hasError: false,
            hasAutofocus: false,
        });
    });
});

describe('properties', () =>
{
    it('name getter should return input vm name', () =>
    {
        const { inputViewmodelMock, formElementViewmodel } = setupViewmodels({
            id: 'test-field',
            name: 'test-field',
            value: 'test-value',
            isDisabled: false,
            hasError: false,
            hasAutofocus: false,
        });

        expect(inputViewmodelMock.name).toBe(formElementViewmodel.name);
        expect(formElementViewmodel.name).toBe('test-field');
    });

    it('value getter should return input vm value', () =>
    {
        const { inputViewmodelMock, formElementViewmodel } = setupViewmodels({
            id: 'test-field',
            name: 'test-field',
            value: 'test-value',
            isDisabled: false,
            hasError: false,
            hasAutofocus: false,
        });

        expect(inputViewmodelMock.value).toBe(formElementViewmodel.value);
        expect(formElementViewmodel.value).toBe('test-value');
    });

    it('value setter should call input vm value setter and update vm state', () =>
    {
        const { inputViewmodelMock, formElementViewmodel } = setupViewmodels({
            id: 'test-field',
            name: 'test-field',
            value: 'test-value',
            isDisabled: false,
            hasError: false,
            hasAutofocus: false,
        });

        formElementViewmodel.value = 'new-value';

        expect(inputViewmodelMock.value).toBe(formElementViewmodel.value);
        expect(formElementViewmodel.value).toBe('new-value');
    });
});

describe('disable', () =>
{
    it('should call input vm disable method and update vm state', () =>
    {
        const { formElementViewmodel, inputViewmodelMock } = setupViewmodels({
            id: 'field',
            name: 'field',
            value: 'value',
            isDisabled: false,
            hasError: false,
            hasAutofocus: false,
        });

        inputViewmodelMock.disable.mockImplementation(() =>
        {
            inputViewmodelMock.state.update({ isDisabled: true });
        });

        formElementViewmodel.disable();

        expect(inputViewmodelMock.disable).toHaveBeenCalledTimes(1);
        expect(formElementViewmodel.state.value.isDisabled).toBe(true);
    });
});

describe('enable', () =>
{
    it('should call input vm enable method and update vm state', () =>
    {
        const { formElementViewmodel, inputViewmodelMock } = setupViewmodels({
            id: 'field',
            name: 'field',
            value: 'value',
            isDisabled: false,
            hasError: false,
            hasAutofocus: false,
        });

        inputViewmodelMock.enable.mockImplementation(() =>
        {
            inputViewmodelMock.state.update({ isDisabled: false });
        });

        formElementViewmodel.enable();

        expect(inputViewmodelMock.enable).toHaveBeenCalledTimes(1);
        expect(formElementViewmodel.state.value.isDisabled).toBe(false);
    });
});

describe('setDefaultValue', () =>
{
    it('should call input vm setDefaultValue method and update vm state', () =>
    {
        const { formElementViewmodel, inputViewmodelMock } = setupViewmodels({
            id: 'field',
            name: 'field',
            value: 'value',
            isDisabled: false,
            hasError: false,
            hasAutofocus: false,
        });

        formElementViewmodel.setDefaultValue();

        expect(inputViewmodelMock.setDefaultValue).toHaveBeenCalledTimes(1);
    });
});

describe('dispose', () =>
{
    it('should dispose input vm on dispose', () =>
    {
        const { formElementViewmodel, inputViewmodelMock } = setupViewmodels({
            id: 'title',
            name: 'title',
            value: 'initial-value',
            isDisabled: false,
            hasError: false,
            hasAutofocus: false,
        });

        formElementViewmodel[Symbol.dispose]();

        expect(inputViewmodelMock[Symbol.dispose]).toHaveBeenCalledTimes(1);
    });
});