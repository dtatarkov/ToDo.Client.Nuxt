import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormBase } from '../../entities/formBase';
import type { FormElement } from '../../entities/formElement';
import { createFormElementMock } from '../../mocks/formElementMock';
import { createFormElementsFactoryMock } from '../../mocks/formElementsFactoryMock';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import type { Func } from '@/modules/shared/types/func';
import type { Action } from '@/modules/shared/types/action';

function createForm(
    elements: FormElement[],
    submitHandler: Func<Promise<void>, [Record<string, any>]> = vi.fn(async () => { })
): FormBase
{
    const factory = createFormElementsFactoryMock(elements);
    const scheme: EntityScheme<any> = {};

    const form = new FormBase(factory, {
        submit: submitHandler,
        scheme,
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
            expect(descriptionElement.value).toBe('old-desc');
        });
    });

    describe('submit', () =>
    {
        it('should be cancelled if form contains errors', async () =>
        {
            const validElement = createFormElementMock('title', 'value', true);
            const invalidElement = createFormElementMock('description', 'value', false);
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

            const elements = [
                createFormElementMock('title', 'value', true),
            ];

            const form = createForm(elements, submitHandler);

            const command = form.getSubmitCommand();
            const executePromise = command.executeAsync();

            expect(form.isDisabled).toBe(true);

            resolveSubmit?.();
            await executePromise;

            expect(form.isDisabled).toBe(false);
        });
    });
});