import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormViewmodelImpl } from '../../src/viewmodels/formViewmodelImpl';
import { formElementViewmodelsFactoryMock } from '../mocks/formElementViewmodelsFactoryMock';
import type { FormViewmodel } from '../../src/viewmodels/formViewmodel';
import { FormElementValidationError } from '../../src/entities/formElementValidationError';
import { setupPausedHandlerAsync } from '@client/shared/mocks';
import { createFormElementViewmodelMock } from '../mocks/formElementViewmodelMock';
import { FormDisabledException } from '../../src/exceptions/formDisabledException';
import { InputType } from '@client/ui-uikit';

const submitHandler = vi.fn();
const validationErrorHandler = vi.fn();

function setupViewmodel(elements: ReturnType<typeof createFormElementViewmodelMock>[]): FormViewmodel<any>
{
    const viewmodel = new FormViewmodelImpl(elements, { submit: submitHandler });

    return viewmodel;
}

describe('FormViewmodelImpl', () =>
{
    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('state', () =>
    {
        it('should have correct initial state', () =>
        {
            const titleElement = createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: '' });
            formElementViewmodelsFactoryMock.createViewmodels.mockReturnValue([titleElement]);

            const viewmodel = setupViewmodel([titleElement]);

            expect(viewmodel.state.value).toEqual({
                elements: [
                    expect.objectContaining({ name: 'title', inputType: InputType.inputText, value: '', hasError: false })
                ],

                isDisabled: false,
            });
        });

        it('should expose element values', () =>
        {
            const titleElement = createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'test-title' });
            const descriptionElement = createFormElementViewmodelMock('description', { inputType: InputType.inputText, value: 'test-desc' });

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);

            expect(viewmodel.state.value.elements).toEqual([
                expect.objectContaining({ name: 'title', value: 'test-title' }),
                expect.objectContaining({ name: 'description', value: 'test-desc' })
            ]);
        });

        // it('should expose element errors', async () =>
        // {
        //     const error1 = new FormElementValidationError('title', 'title', 'Title is required');
        //     const error2 = new FormElementValidationError('description', 'description', 'Description is required');

        //     const titleElement = createFormElementViewmodelMock('title', { type: InputType.inputText, value: '' });
        //     titleElement.markAsInvalid(error1);

        //     const descriptionElement = createFormElementViewmodelMock('description', { type: InputType.inputText, value: '' });
        //     descriptionElement.markAsInvalid(error2);

        //     const viewmodel = setupViewmodel([titleElement, descriptionElement]);
        //     const command = viewmodel.getSubmitCommand();

        //     await command.executeAsync();

        //     expect(viewmodel.state.value.elements).toEqual([
        //         expect.objectContaining({ name: 'title', hasError: true }),
        //         expect.objectContaining({ name: 'description', hasError: true }),
        //     ]);
        // });

        it('should have empty errors when all elements are valid', async () =>
        {
            const titleElement = createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'value' });
            const descriptionElement = createFormElementViewmodelMock('description', { inputType: InputType.inputText, value: 'value' });

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);
            const command = viewmodel.getSubmitCommand();

            await command.executeAsync();

            expect(viewmodel.state.value.elements).toEqual([
                expect.objectContaining({ name: 'title', hasError: false }),
                expect.objectContaining({ name: 'description', hasError: false }),
            ]);
        });
    });

    describe('getData', () =>
    {
        it('should return data from all elements', () =>
        {
            const titleElement = createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'test-title' });
            const descriptionElement = createFormElementViewmodelMock('description', { inputType: InputType.inputText, value: 'test-desc' });

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);

            expect(viewmodel.getData()).toEqual({
                title: 'test-title',
                description: 'test-desc',
            });
        });
    });

    describe('setData', () =>
    {
        it('should update value of matching form element and reset others', () =>
        {
            const titleElement = createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'old-title' });
            const descriptionElement = createFormElementViewmodelMock('description', { inputType: InputType.inputText, value: 'old-desc' });

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);

            viewmodel.setData({ title: 'new-title' });

            expect(titleElement.value).toBe('new-title');
            expect(descriptionElement.setDefaultValue).toBeCalled();
        });

        it('should throw FormDisabledException when form is disabled', async () =>
        {
            const titleElement = createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'value' });
            titleElement.markAsValid();

            const viewmodel = setupViewmodel([titleElement]);
            await setupPausedHandlerAsync(submitHandler);

            const command = viewmodel.getSubmitCommand();
            command.executeAsync();

            expect(() => viewmodel.setData({ title: 'new-value' })).toThrow(FormDisabledException);
        });
    });

    describe('submit command execution', () =>
    {
        it('should switch form to disabled state during submission', async () =>
        {
            const titleElement = createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'value' });
            titleElement.markAsValid();

            const viewmodel = setupViewmodel([titleElement]);
            const resume = await setupPausedHandlerAsync(submitHandler);

            const command = viewmodel.getSubmitCommand();
            const promise = command.executeAsync();

            expect(viewmodel.state.value.isDisabled).toBe(true);
            resume();
            await promise;
            expect(viewmodel.state.value.isDisabled).toBe(false);
        });

        it('should call submit handler with correct data on success', async () =>
        {
            const titleElement = createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'test-title' });
            titleElement.markAsValid();

            const descriptionElement = createFormElementViewmodelMock('description', { inputType: InputType.inputText, value: 'test-desc' });
            descriptionElement.markAsValid();

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);

            const command = viewmodel.getSubmitCommand();
            const result = await command.executeAsync();

            expect(result).toBe(true);
            expect(submitHandler).toHaveBeenCalledTimes(1);

            expect(submitHandler).toHaveBeenCalledWith({
                title: 'test-title',
                description: 'test-desc',
            });
        });
    });

    describe('onValidationError', () =>
    {
        it('should emit FormValidationError when submit fails validation', async () =>
        {
            const validationError = new FormElementValidationError('description', 'description', 'Field is required');

            const invalidFormElement = createFormElementViewmodelMock('description', { inputType: InputType.inputText, value: '' });
            invalidFormElement.markAsInvalid(validationError);

            const validElement = createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'value' });
            validElement.markAsValid();

            const viewmodel = setupViewmodel([invalidFormElement, validElement]);

            viewmodel.onValidationError(validationErrorHandler);

            const command = viewmodel.getSubmitCommand();
            const result = await command.executeAsync();

            expect(result).toBe(false);
            expect(validationErrorHandler).toBeCalledWith(expect.objectContaining({ errors: [validationError] }));
        });

        it('should emit FormValidationError with multiple errors when multiple elements fail', async () =>
        {
            const error1 = new FormElementValidationError('title', 'title', 'Title is required');
            const error2 = new FormElementValidationError('description', 'description', 'Description is required');

            const titleElement = createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: '' });
            titleElement.markAsInvalid(error1);

            const descriptionElement = createFormElementViewmodelMock('description', { inputType: InputType.inputText, value: '' });
            descriptionElement.markAsInvalid(error2);

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);
            viewmodel.onValidationError(validationErrorHandler);

            const command = viewmodel.getSubmitCommand();
            const result = await command.executeAsync();

            expect(result).toBe(false);
            expect(validationErrorHandler).toBeCalledWith(expect.objectContaining({ errors: [error1, error2] }));
        });

        it('should not emit onError when validation passes', async () =>
        {
            const element = createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'value' });
            element.markAsValid();

            const viewmodel = setupViewmodel([element]);
            viewmodel.onValidationError(validationErrorHandler);

            const command = viewmodel.getSubmitCommand();
            const result = await command.executeAsync();

            expect(result).toBe(true);
            expect(submitHandler).toHaveBeenCalled();
            expect(validationErrorHandler).not.toHaveBeenCalled();
        });
    });
});
