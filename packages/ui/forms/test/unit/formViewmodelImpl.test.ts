import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormViewmodelImpl } from '../../src/viewmodels/formViewmodelImpl';
import type { FormViewmodel } from '../../src/viewmodels/formViewmodel';
import { setupPausedHandlerAsync } from '@client/shared/mocks';
import { createFormElementViewmodelMock } from '../mocks/formElementViewmodelMock';
import { FormDisabledException } from '../../src/exceptions/formDisabledException';
import { InputType } from '@client/ui-uikit';
import { ValidationMessage } from '@client/infrastructure-validation';
import type { FormValidationMessages } from '../../src';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import { entitySchemeMock } from '@client/infrastructure-entity-schemes/mocks';

const submitHandler = vi.fn();
const validationErrorHandler = vi.fn();

function setupViewmodel(elements: ReturnType<typeof createFormElementViewmodelMock>[], scheme?: EntityScheme<any>): FormViewmodel<any>
{
    const viewmodel = new FormViewmodelImpl(elements, { submit: submitHandler }, scheme);

    return viewmodel;
}

beforeEach(() =>
{
    vi.resetAllMocks();
});

describe('state', () =>
{
    it('should expose elements state', () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: '' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'test-desc' });

        const viewmodel = setupViewmodel([titleElement, descriptionElement]);

        expect(viewmodel.state.value.elements).toEqual([
            expect.objectContaining({
                name: 'title',
                inputType: InputType.inputText,
                value: '',
                hasError: false,
                hasAutofocus: false,
                isDisabled: false,
            }),
            expect.objectContaining({
                name: 'description',
                inputType: InputType.inputText,
                value: 'test-desc',
                hasError: false,
                hasAutofocus: false,
                isDisabled: false,
            }),
        ]);
    });

    it('should not be disabled by default', () =>
    {
        const viewmodel = setupViewmodel([]);

        expect(viewmodel.state.value.isDisabled).toBe(false);
    });
});

describe('getData', () =>
{
    it('should return data from all elements', () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'test-title' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'test-desc' });

        const viewmodel = setupViewmodel([titleElement, descriptionElement]);

        expect(viewmodel.getData()).toEqual({
            title: 'test-title',
            description: 'test-desc',
        });
    });
});

describe('setData', () =>
{
    it('updates value of matching form element', () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'old-title' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'old-desc' });

        const viewmodel = setupViewmodel([titleElement, descriptionElement]);

        viewmodel.setData({ title: 'new-title' });

        expect(titleElement.value).toBe('new-title');
    });

    it('resets other elements to default value', () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'old-title' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'old-desc' });

        const viewmodel = setupViewmodel([titleElement, descriptionElement]);

        viewmodel.setData({ title: 'new-title' });

        expect(descriptionElement.setDefaultValue).toBeCalled();
    });

    it('should throw FormDisabledException when form is disabled', async () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'value' });

        const viewmodel = setupViewmodel([titleElement]);
        await setupPausedHandlerAsync(submitHandler);

        viewmodel.submitAsync();

        expect(() => viewmodel.setData({ title: 'new-value' })).toThrow(FormDisabledException);
    });
});

describe('submit', () =>
{
    it('should execute submit command', async () =>
    {
        const element = createFormElementViewmodelMock('title', { value: 'value' });

        const viewmodel = setupViewmodel([element]);

        const command = viewmodel.getSubmitCommand();
        const executionHandler = vi.fn();

        command.onExecuting(executionHandler);

        await viewmodel.submitAsync();

        expect(executionHandler).toHaveBeenCalledTimes(1);
    });

    it('should switch form to disabled state during submission', async () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'value' });

        const viewmodel = setupViewmodel([titleElement]);
        const resume = await setupPausedHandlerAsync(submitHandler);

        const promise = viewmodel.submitAsync();

        expect(viewmodel.state.value.isDisabled).toBe(true);
        resume();
        await promise;
        expect(viewmodel.state.value.isDisabled).toBe(false);
    });

    it('should call submit handler with correct data on success', async () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'test-title' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'test-desc' });

        const viewmodel = setupViewmodel([titleElement, descriptionElement]);

        await viewmodel.submitAsync();

        expect(submitHandler).toHaveBeenCalledTimes(1);

        expect(submitHandler).toHaveBeenCalledWith({
            title: 'test-title',
            description: 'test-desc',
        });
    });
});

describe('onValidationError', () =>
{
    it('should emit validation messages when submit fails validation', async () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: '' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'value' });

        const validationMessages: FormValidationMessages = {
            title: [new ValidationMessage('todo.field.title.errors.empty')]
        };

        entitySchemeMock.validate.mockReturnValue(validationMessages);

        const viewmodel = setupViewmodel([titleElement, descriptionElement], entitySchemeMock);
        viewmodel.onValidationError(validationErrorHandler);

        await viewmodel.submitAsync();

        expect(validationErrorHandler).toHaveBeenCalledWith(validationMessages);
    });

    it('should not emit onError when validation passes', async () =>
    {
        const element = createFormElementViewmodelMock('title', { value: 'value' });

        const viewmodel = setupViewmodel([element]);
        viewmodel.onValidationError(validationErrorHandler);

        await viewmodel.submitAsync();

        expect(submitHandler).toHaveBeenCalled();
        expect(validationErrorHandler).not.toHaveBeenCalled();
    });
});
