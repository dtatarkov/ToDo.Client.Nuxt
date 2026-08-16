import { describe, it, expect } from 'vitest';
import { FormLockBase } from '../../src/entities/formLockBase';
import { FormDisabledException } from '../../src/exceptions/formDisabledException';
import { createFormStateMock } from '../mocks/formStateMock';
import type { ObservableViewmodelState } from '@client/ui-core';
import type { FormElementViewmodel } from '../../src/viewmodels/formElementViewmodel';
import { createFormElementViewmodelMock } from '../mocks/formElementViewmodelMock';
import { InputType } from '@client/ui-uikit';
import type { FormState } from '../../src';

function setupFormLock(elements: FormElementViewmodel[], state: ObservableViewmodelState<FormState>): FormLockBase
{
    return new FormLockBase(elements, state);
}

describe('FormLock', () =>
{
    describe('isDisabled', () =>
    {
        it('should return false when form is enabled', () =>
        {
            const state = createFormStateMock({ isDisabled: false });
            const formLock = setupFormLock([], state);

            expect(formLock.isDisabled()).toBe(false);
        });

        it('should return true when form is disabled', () =>
        {
            const state = createFormStateMock({ isDisabled: true });
            const formLock = setupFormLock([], state);

            expect(formLock.isDisabled()).toBe(true);
        });
    });

    describe('enable', () =>
    {
        it('should enable all elements', () =>
        {
            const elements = [
                createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'Initial Title' }),
                createFormElementViewmodelMock('description', { inputType: InputType.inputText, value: 'Initial Description' }),
            ];

            const state = createFormStateMock({ isDisabled: true });
            const formLock = setupFormLock(elements, state);

            formLock.enable();

            elements.forEach(element =>
            {
                expect(element.enable).toHaveBeenCalledTimes(1);
            });
        });

        it('should update state to enabled', () =>
        {
            const state = createFormStateMock({ isDisabled: true });
            const formLock = setupFormLock([], state);

            formLock.enable();

            expect(state.update).toBeCalledWith(expect.objectContaining({
                isDisabled: false,
            }));
        });

        it('should be idempotent when already enabled', () =>
        {
            const elements = [
                createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'Initial Title' }),
                createFormElementViewmodelMock('description', { inputType: InputType.inputText, value: 'Initial Description' }),
            ];

            const state = createFormStateMock({ isDisabled: false });
            const formLock = setupFormLock(elements, state);

            formLock.enable();

            elements.forEach(element =>
            {
                expect(element.enable).not.toHaveBeenCalled();
            });

            expect(state.value.isDisabled).toBe(false);
        });
    });

    describe('disable', () =>
    {
        it('should disable all elements', () =>
        {
            const elements = [
                createFormElementViewmodelMock('title', { inputType: InputType.inputText, value: 'Initial Title' }),
                createFormElementViewmodelMock('description', { inputType: InputType.inputText, value: 'Initial Description' }),
            ];

            const state = createFormStateMock({ isDisabled: false });
            const formLock = setupFormLock(elements, state);

            formLock.disable();

            elements.forEach(element =>
            {
                expect(element.disable).toHaveBeenCalledTimes(1);
            });
        });

        it('should update state to disabled', () =>
        {
            const state = createFormStateMock({ isDisabled: false });
            const formLock = setupFormLock([], state);

            formLock.disable();

            expect(state.update).toBeCalledWith(expect.objectContaining({
                isDisabled: true
            }));
        });

        it('should throw error when already disabled', () =>
        {
            const state = createFormStateMock({ isDisabled: true });
            const formLock = setupFormLock([], state);

            expect(() => formLock.disable()).toThrow(FormDisabledException);
        });
    });

    describe('assertNotDisabled', () =>
    {
        it('should not throw when form is enabled', () =>
        {
            const state = createFormStateMock({ isDisabled: false });
            const formLock = setupFormLock([], state);

            expect(() => formLock.assertNotDisabled()).not.toThrow();
        });

        it('should throw FormDisabledException when form is disabled', () =>
        {
            const state = createFormStateMock({ isDisabled: true });
            const formLock = setupFormLock([], state);

            expect(() => formLock.assertNotDisabled()).toThrow(FormDisabledException);
        });
    });
});
