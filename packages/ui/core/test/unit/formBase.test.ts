import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormBase } from '../../src/entities/formBase';
import type { FormElement } from '../../src/entities/formElement';
import { createFormElementMock } from '../mocks/formElementMock';
import { createFormElementsFactoryMock } from '../mocks/formElementsFactoryMock';
import { FormValidationError } from '../../src/entities/formValidationError';
import { FormElementValidationError } from '../../src/entities/formElementValidationError';
import { type Func, type Action, DisposeToken } from '@client/shared';

function createForm(
    elements: FormElement[],
    submitHandler: Func<Promise<void>, [Record<string, any>]> = vi.fn(async () => { })
): FormBase
{
    const factory = createFormElementsFactoryMock(elements);

    const form = new FormBase(factory, {
        submit: submitHandler,
        elements: {},
    });

    return form;
}

describe('FormBase', () =>
{
    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('getData', () =>
    {
        it('should contain all fields from scheme', () =>
        {
            const elements = [
                createFormElementMock('title', 'test-title'),
                createFormElementMock('description', 'test-desc'),
            ];

            const form = createForm(elements);

            const data = form.getData();

            expect(data).toEqual({
                title: 'test-title',
                description: 'test-desc',
            });
        });
    });

    describe('setData', () =>
    {
        it('should update value of matching form element', () =>
        {
            const titleElement = createFormElementMock('title', 'old-title');
            const descriptionElement = createFormElementMock('description', 'old-desc');

            const form = createForm([titleElement, descriptionElement]);

            form.setData({ title: 'new-title' });

            expect(titleElement.value).toBe('new-title');
        });

        it('should call setDefaultValue on element not present in data', () =>
        {
            const titleElement = createFormElementMock('title', 'old-title');
            const descriptionElement = createFormElementMock('description', 'old-desc');

            const form = createForm([titleElement, descriptionElement]);

            form.setData({ title: 'new-title' });

            expect(descriptionElement.setDefaultValue).toHaveBeenCalledTimes(1);
        });
    });

    describe('submit', () =>
    {
        it('should be cancelled if form contains errors', async () =>
        {
            const validElement = createFormElementMock('title', 'value');
            validElement.isValid.mockReturnValue(true);

            const invalidElement = createFormElementMock('description', 'value');
            invalidElement.isValid.mockReturnValue(false);

            const submitHandler = vi.fn(async () => { });
            const form = createForm([validElement, invalidElement], submitHandler);

            const command = form.getSubmitCommand();
            const result = await command.executeAsync();

            expect(submitHandler).not.toHaveBeenCalled();
            expect(result).toBe(false);
        });

        it('should switch form to disabled state during submission', async () =>
        {
            let resolveSubmit: Action | undefined;

            const submitPromise = new Promise<void>(resolve =>
            {
                resolveSubmit = resolve;
            });

            const submitHandler = vi.fn(() => submitPromise);

            const titleElement = createFormElementMock('title', 'value');
            titleElement.isValid.mockReturnValueOnce(true);

            const elements = [
                titleElement,
            ];

            const form = createForm(elements, submitHandler);

            const command = form.getSubmitCommand();
            const executePromise = command.executeAsync();

            expect(form.isDisabled()).toBe(true);

            resolveSubmit?.();
            await executePromise;

            expect(form.isDisabled()).toBe(false);
        });
    });

    describe('onError', () =>
    {
        it('should emit FormValidationError when submit fails validation', async () =>
        {
            const validationError = new FormElementValidationError('description', 'Field is required');
            const invalidFormElement = createFormElementMock('description', '');
            invalidFormElement.isValid.mockReturnValue(false);
            invalidFormElement.getError.mockReturnValue(validationError);

            const validElement = createFormElementMock('title', 'value');
            validElement.isValid.mockReturnValue(true);

            const submitHandler = vi.fn(async () => { });
            const form = createForm([validElement, invalidFormElement], submitHandler);

            const onErrorHandler = vi.fn();
            const disposeToken = new DisposeToken();
            form.onValidationError(onErrorHandler, disposeToken);

            const command = form.getSubmitCommand();
            const result = await command.executeAsync();

            expect(result).toBe(false);
            expect(submitHandler).not.toHaveBeenCalled();
            expect(onErrorHandler).toHaveBeenCalledTimes(1);

            const formValidationError = onErrorHandler.mock.calls[0]?.[0] as FormValidationError;
            expect(formValidationError).toBeInstanceOf(FormValidationError);
            expect(formValidationError.errors).toHaveLength(1);
            expect(formValidationError.errors).contain(validationError);

            disposeToken[Symbol.dispose]();
        });

        it('should emit FormValidationError with multiple errors when multiple elements fail', async () =>
        {
            const error1 = new FormElementValidationError('title', 'Title is required');
            const error2 = new FormElementValidationError('description', 'Description is required');

            const titleElement = createFormElementMock('title', '');
            titleElement.isValid.mockReturnValue(false);
            titleElement.getError.mockReturnValue(error1);

            const descriptionElement = createFormElementMock('description', '');
            descriptionElement.isValid.mockReturnValue(false);
            descriptionElement.getError.mockReturnValue(error2);

            const submitHandler = vi.fn(async () => { });
            const form = createForm([titleElement, descriptionElement], submitHandler);

            const onErrorHandler = vi.fn();
            const disposeToken = new DisposeToken();
            form.onValidationError(onErrorHandler, disposeToken);

            const command = form.getSubmitCommand();
            const result = await command.executeAsync();

            expect(result).toBe(false);
            expect(onErrorHandler).toHaveBeenCalledTimes(1);

            const formValidationError = onErrorHandler.mock.calls[0]?.[0] as FormValidationError;
            expect(formValidationError.errors).toHaveLength(2);
            expect(formValidationError.errors).contain(error1);
            expect(formValidationError.errors).contain(error2);

            disposeToken[Symbol.dispose]();
        });

        it('should not emit onError when validation passes', async () =>
        {
            const element = createFormElementMock('title', 'value');
            element.isValid.mockReturnValue(true);

            const submitHandler = vi.fn(async () => { });
            const form = createForm([element], submitHandler);

            const onErrorHandler = vi.fn();
            const disposeToken = new DisposeToken();
            form.onValidationError(onErrorHandler, disposeToken);

            const command = form.getSubmitCommand();
            const result = await command.executeAsync();

            expect(result).toBe(true);
            expect(submitHandler).toHaveBeenCalledTimes(1);
            expect(onErrorHandler).not.toHaveBeenCalled();

            disposeToken[Symbol.dispose]();
        });
    });
});