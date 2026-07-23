import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormViewmodelImpl } from '../../src/viewmodels/formViewmodelImpl';
import { createFormElementMock } from '../mocks/formElementMock';
import { getPromiseResolverAsync } from '@client/shared';
import { formElementsFactoryMock } from '../mocks/formElementsFactoryMock';
import type { FormElement } from '../../src/entities/formElement';
import type { FormViewmodel } from '../../src/viewmodels/formViewmodel';
import { FormElementValidationError } from '../../src/entities/formElementValidationError';
import type { FormElementData } from '../../src/types/formElementData';
import { FormElementType } from '../../src/enums/formElementType';
import { FormConfiguration } from '../../src/configuration/formConfiguration';

const submitHandler = vi.fn();
const validationErrorHandler = vi.fn();

function markElementValid(element: ReturnType<typeof createFormElementMock>)
{
    element.isValid.mockReturnValue(true);
}

function markElementInvalid(element: ReturnType<typeof createFormElementMock>, validationError: FormElementValidationError)
{
    element.isValid.mockReturnValue(false);
    element.getError.mockReturnValue(validationError);
}

function setupViewmodel(elements: FormElement[]): FormViewmodel<any>
{
    formElementsFactoryMock.createElements.mockReturnValue(elements);

    const viewmodel = new FormViewmodelImpl(formElementsFactoryMock, new FormConfiguration({}), { submit: submitHandler });

    return viewmodel;
}

async function setupPausedSubmitHandlerAsync()
{
    const { resolve, promise } = await getPromiseResolverAsync();

    submitHandler.mockReturnValue(promise);

    return resolve;
}

// TODO: change to integration tests
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
            const elementsData: Record<string, FormElementData> = {
                title: {
                    type: FormElementType.inputText,
                    value: ''
                }
            };

            const titleElement = createFormElementMock('title', '');
            formElementsFactoryMock.createElements.mockReturnValue([titleElement]);

            const viewmodel = new FormViewmodelImpl(formElementsFactoryMock, new FormConfiguration(elementsData), { submit: submitHandler });

            expect(viewmodel.state.value.elements).toEqual(elementsData);
            expect(viewmodel.state.value.data).toEqual({ title: '' });
            expect(viewmodel.state.value.isDisabled).toBe(false);
        });

        it('should expose element values as data', () =>
        {
            const titleElement = createFormElementMock('title', 'test-title');
            const descriptionElement = createFormElementMock('description', 'test-desc');

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);

            expect(viewmodel.state.value.data).toEqual({
                title: 'test-title',
                description: 'test-desc',
            });
        });

        it('should expose element errors', async () =>
        {
            const error1 = new FormElementValidationError('title', 'title', 'Title is required');
            const error2 = new FormElementValidationError('description', 'description', 'Description is required');

            const titleElement = createFormElementMock('title', '');
            markElementInvalid(titleElement, error1);

            const descriptionElement = createFormElementMock('description', '');
            markElementInvalid(descriptionElement, error2);

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);
            const command = viewmodel.getSubmitCommand();

            await command.executeAsync();

            expect(viewmodel.state.value.errors).toEqual({
                title: error1,
                description: error2
            });
        });

        it('should have empty errors when all elements are valid', async () =>
        {
            const titleElement = createFormElementMock('title', 'value');
            markElementValid(titleElement);

            const descriptionElement = createFormElementMock('description', 'value');
            markElementValid(descriptionElement);

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);
            const command = viewmodel.getSubmitCommand();

            await command.executeAsync();

            expect(viewmodel.state.value.errors).toEqual({});
        });
    });

    describe('getData', () =>
    {
        it('should return data from all elements', () =>
        {
            const titleElement = createFormElementMock('title', 'test-title');
            const descriptionElement = createFormElementMock('description', 'test-desc');

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
            const titleElement = createFormElementMock('title', 'old-title');
            const descriptionElement = createFormElementMock('description', 'old-desc');

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);

            viewmodel.setData({ title: 'new-title' });

            expect(titleElement.value).toBe('new-title');
            expect(descriptionElement.setDefaultValue).toBeCalled();
        });

        it('should update state with new data', () =>
        {
            const titleElement = createFormElementMock('title', 'old-title');
            const descriptionElement = createFormElementMock('description', 'old-desc');

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);

            const newData = {
                title: 'new-title',
                description: 'new-desc'
            };

            viewmodel.setData(newData);

            expect(viewmodel.state.value.data).toEqual(newData);
        });

        it('should throw FormDisabledException when form is disabled', async () =>
        {
            const titleElement = createFormElementMock('title', 'value');
            markElementValid(titleElement);

            const viewmodel = setupViewmodel([titleElement]);
            await setupPausedSubmitHandlerAsync();

            const command = viewmodel.getSubmitCommand();
            command.executeAsync();

            expect(() => viewmodel.setData({ title: 'new-value' })).toThrow();
        });
    });

    describe('submit command execution', () =>
    {
        it('should switch form to disabled state during submission', async () =>
        {
            const titleElement = createFormElementMock('title', 'value');
            markElementValid(titleElement);

            const viewmodel = setupViewmodel([titleElement]);
            const resume = await setupPausedSubmitHandlerAsync();

            const command = viewmodel.getSubmitCommand();
            const promise = command.executeAsync();

            expect(viewmodel.state.value.isDisabled).toBe(true);
            resume();
            await promise;
            expect(viewmodel.state.value.isDisabled).toBe(false);
        });

        it('should call submit handler with correct data on success', async () =>
        {
            const titleElement = createFormElementMock('title', 'test-title');
            markElementValid(titleElement);

            const descriptionElement = createFormElementMock('description', 'test-desc');
            markElementValid(descriptionElement);

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
            const invalidFormElement = createFormElementMock('description', '');
            markElementInvalid(invalidFormElement, validationError);

            const validElement = createFormElementMock('title', 'value');

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

            const titleElement = createFormElementMock('title', '');
            markElementInvalid(titleElement, error1);

            const descriptionElement = createFormElementMock('description', '');
            markElementInvalid(descriptionElement, error2);

            const viewmodel = setupViewmodel([titleElement, descriptionElement]);
            viewmodel.onValidationError(validationErrorHandler);

            const command = viewmodel.getSubmitCommand();
            const result = await command.executeAsync();

            expect(result).toBe(false);
            expect(validationErrorHandler).toBeCalledWith(expect.objectContaining({ errors: [error1, error2] }));
        });

        it('should not emit onError when validation passes', async () =>
        {
            const element = createFormElementMock('title', 'value');
            markElementValid(element);

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
