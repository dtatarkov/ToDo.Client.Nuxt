import { describe, it, expect } from 'vitest';
import { FormLockBase } from '../../src/entities/formLockBase';
import { FormDisabledException } from '../../src/exceptions/formDisabledException';
import { createFormDataMock } from '../mocks/formDataMock';
import type { ObservableViewmodelState } from '@client/ui-core';
import type { FormElementViewmodel } from '../../src/viewmodels/formElementViewmodel';
import { createFormElementViewmodelMock } from '../mocks/formElementViewmodelMock';
import type { FormData } from '../../src';

function setupFormLock(elements: FormElementViewmodel[], state: ObservableViewmodelState<FormData>): FormLockBase
{
    return new FormLockBase(elements, state);
}

describe('isDisabled', () =>
{
    it('should return false when form is enabled', () =>
    {
        const state = createFormDataMock({ isDisabled: false });
        const formLock = setupFormLock([], state);

        expect(formLock.isDisabled()).toBe(false);
    });

    it('should return true when form is disabled', () =>
    {
        const state = createFormDataMock({ isDisabled: true });
        const formLock = setupFormLock([], state);

        expect(formLock.isDisabled()).toBe(true);
    });
});

describe('enable', () =>
{
    it('should enable all elements', () =>
    {
        const elements = [
            createFormElementViewmodelMock('title', { value: 'Initial Title' }),
            createFormElementViewmodelMock('description', { value: 'Initial Description' }),
        ];

        const state = createFormDataMock({ isDisabled: true });
        const formLock = setupFormLock(elements, state);

        formLock.enable();

        elements.forEach(element =>
        {
            expect(element.enable).toHaveBeenCalledTimes(1);
        });
    });

    it('should update state to enabled', () =>
    {
        const state = createFormDataMock({ isDisabled: true });
        const formLock = setupFormLock([], state);

        formLock.enable();

        expect(state.update).toBeCalledWith(expect.objectContaining({
            isDisabled: false,
        }));
    });

    it('should be idempotent when already enabled', () =>
    {
        const elements = [
            createFormElementViewmodelMock('title', { value: 'Initial Title' }),
            createFormElementViewmodelMock('description', { value: 'Initial Description' }),
        ];

        const state = createFormDataMock({ isDisabled: false });
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
            createFormElementViewmodelMock('title', { value: 'Initial Title' }),
            createFormElementViewmodelMock('description', { value: 'Initial Description' }),
        ];

        const state = createFormDataMock({ isDisabled: false });
        const formLock = setupFormLock(elements, state);

        formLock.disable();

        elements.forEach(element =>
        {
            expect(element.disable).toHaveBeenCalledTimes(1);
        });
    });

    it('should update state to disabled', () =>
    {
        const state = createFormDataMock({ isDisabled: false });
        const formLock = setupFormLock([], state);

        formLock.disable();

        expect(state.update).toBeCalledWith(expect.objectContaining({
            isDisabled: true
        }));
    });

    it('should throw error when already disabled', () =>
    {
        const state = createFormDataMock({ isDisabled: true });
        const formLock = setupFormLock([], state);

        expect(() => formLock.disable()).toThrow(FormDisabledException);
    });
});

describe('assertNotDisabled', () =>
{
    it('should not throw when form is enabled', () =>
    {
        const state = createFormDataMock({ isDisabled: false });
        const formLock = setupFormLock([], state);

        expect(() => formLock.assertNotDisabled()).not.toThrow();
    });

    it('should throw FormDisabledException when form is disabled', () =>
    {
        const state = createFormDataMock({ isDisabled: true });
        const formLock = setupFormLock([], state);

        expect(() => formLock.assertNotDisabled()).toThrow(FormDisabledException);
    });
});
