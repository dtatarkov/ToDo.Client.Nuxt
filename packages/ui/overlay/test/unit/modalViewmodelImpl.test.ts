import { describe, it, expect } from 'vitest';
import { ModalViewmodelImpl } from '../../src/viewmodels/modalViewmodelImpl';
import type { ModalViewmodelOptions } from '../../src/types/modalViewmodelOptions';
import { viewmodelMock, createViewmodelMock } from '@client/ui-core/mocks';
import { createButtonGeneralViewmodelMock } from '@client/ui-uikit/mocks';

function setupViewmodel(options: ModalViewmodelOptions<{}>): ModalViewmodelImpl<{}>
{
    return new ModalViewmodelImpl(options);
}

describe('ModalViewmodelImpl', () =>
{
    describe('state', () =>
    {
        it('should have provided title', () =>
        {
            const modal = setupViewmodel({ content: viewmodelMock, title: 'Test title' });

            expect(modal.state.value.title).toBe('Test title');
        });

        it('should have provided description', () =>
        {
            const modal = setupViewmodel({ content: viewmodelMock, description: 'Test description' });

            expect(modal.state.value.description).toBe('Test description');
        });

        it('should have provided content state', () =>
        {
            const content = createViewmodelMock({ foo: 'bar' });
            const modal = setupViewmodel({ content });

            expect(modal.state.value.content).toEqual(content.state.value);
        });

        it('should have provided buttonConfirm state', () =>
        {
            const buttonConfirm = createButtonGeneralViewmodelMock();
            const modal = setupViewmodel({ content: viewmodelMock, buttonConfirm });

            expect(modal.state.value.buttonConfirm).toEqual(buttonConfirm.state.value);
        });

        it('should have provided buttonCancel state', () =>
        {
            const buttonCancel = createButtonGeneralViewmodelMock();
            const modal = setupViewmodel({ content: viewmodelMock, buttonCancel });

            expect(modal.state.value.buttonCancel).toEqual(buttonCancel.state.value);
        });

        it('should not have buttonConfirm state when buttonConfirm is not provided', () =>
        {
            const modal = setupViewmodel({ content: viewmodelMock });

            expect(modal.state.value.buttonConfirm).toBeUndefined();
        });

        it('should not have buttonCancel state when buttonCancel is not provided', () =>
        {
            const modal = setupViewmodel({ content: viewmodelMock });

            expect(modal.state.value.buttonCancel).toBeUndefined();
        });

        it('should not be disabled by default', () =>
        {
            const modal = setupViewmodel({ content: viewmodelMock });

            expect(modal.state.value.isDisabled).toBe(false);
        });
    });

    describe('enable', () =>
    {
        it('should set isDisabled to false', () =>
        {
            const modal = setupViewmodel({ content: viewmodelMock });

            modal.disable();
            modal.enable();

            expect(modal.state.value.isDisabled).toBe(false);
        });

        it('should enable buttonConfirmViewmodel if present', () =>
        {
            const buttonConfirm = createButtonGeneralViewmodelMock();
            const modal = setupViewmodel({ content: viewmodelMock, buttonConfirm });

            modal.disable();
            modal.enable();

            expect(buttonConfirm.enable).toHaveBeenCalled();
        });

        it('should enable buttonCancelViewmodel if present', () =>
        {
            const buttonCancel = createButtonGeneralViewmodelMock();
            const modal = setupViewmodel({ content: viewmodelMock, buttonCancel });

            modal.disable();
            modal.enable();

            expect(buttonCancel.enable).toHaveBeenCalled();
        });
    });

    describe('disable', () =>
    {
        it('should set isDisabled to true', () =>
        {
            const modal = setupViewmodel({ content: viewmodelMock });

            modal.disable();

            expect(modal.state.value.isDisabled).toBe(true);
        });

        it('should disable buttonConfirmViewmodel if present', () =>
        {
            const buttonConfirm = createButtonGeneralViewmodelMock();
            const modal = setupViewmodel({ content: viewmodelMock, buttonConfirm });

            modal.disable();

            expect(buttonConfirm.disable).toHaveBeenCalled();
        });

        it('should disable buttonCancelViewmodel if present', () =>
        {
            const buttonCancel = createButtonGeneralViewmodelMock();
            const modal = setupViewmodel({ content: viewmodelMock, buttonCancel });

            modal.disable();

            expect(buttonCancel.disable).toHaveBeenCalled();
        });
    });

    describe('dispose', () =>
    {
        it('should dispose content viewmodel', () =>
        {
            const modal = setupViewmodel({ content: viewmodelMock });

            modal[Symbol.dispose]();

            expect(viewmodelMock[Symbol.dispose]).toHaveBeenCalled();
        });

        it('should dispose buttonConfirmViewmodel if present', () =>
        {
            const buttonConfirm = createButtonGeneralViewmodelMock();
            const modal = setupViewmodel({ content: viewmodelMock, buttonConfirm });

            modal[Symbol.dispose]();

            expect(buttonConfirm[Symbol.dispose]).toHaveBeenCalled();
        });

        it('should dispose buttonCancelViewmodel if present', () =>
        {
            const buttonCancel = createButtonGeneralViewmodelMock();
            const modal = setupViewmodel({ content: viewmodelMock, buttonCancel });

            modal[Symbol.dispose]();

            expect(buttonCancel[Symbol.dispose]).toHaveBeenCalled();
        });
    });
});