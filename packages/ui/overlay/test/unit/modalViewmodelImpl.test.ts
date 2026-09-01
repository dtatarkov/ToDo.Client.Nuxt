import { describe, it, expect, vi } from 'vitest';
import { ModalViewmodelImpl, type ModalViewmodelOptions } from '../../src/viewmodels/modalViewmodelImpl';
import { createButtonGeneralViewmodelMock } from '@client/ui-uikit/mocks';
import { OverlayElementType } from '../../src/enums/overlayElementType';
import { createRenderableViewmodelMock, renderableViewmodelMock } from '@client/ui-core/mocks';

function setupViewmodel<TContentData extends Record<string, any>>(options: ModalViewmodelOptions<TContentData>): ModalViewmodelImpl<TContentData>
{
    return new ModalViewmodelImpl(options);
}

describe('ModalViewmodelImpl', () =>
{
    describe('state', () =>
    {
        it('should have provided title', () =>
        {
            const modal = setupViewmodel({
                content: renderableViewmodelMock,
                title: 'Test title'
            });

            expect(modal.state.value.title).toBe('Test title');
        });

        it('should have provided description', () =>
        {
            const modal = setupViewmodel({
                content: renderableViewmodelMock,
                description: 'Test description'
            });

            expect(modal.state.value.description).toBe('Test description');
        });

        it('should have provided content state', () =>
        {
            const content = createRenderableViewmodelMock({ foo: 'bar' });
            const modal = setupViewmodel({ content });

            expect(modal.state.value.content.renderKey).toBe(content.renderKey);
            expect(modal.state.value.content.data).toEqual(content.state.value);
        });

        it('should have provided buttonConfirm state', () =>
        {
            const buttonConfirm = createButtonGeneralViewmodelMock();

            const modal = setupViewmodel({
                content: renderableViewmodelMock,
                buttonConfirm
            });

            expect(modal.state.value.buttonConfirm).toEqual(buttonConfirm.state.value);
        });

        it('should have provided buttonCancel state', () =>
        {
            const buttonCancel = createButtonGeneralViewmodelMock();

            const modal = setupViewmodel({
                content: renderableViewmodelMock,
                buttonCancel
            });

            expect(modal.state.value.buttonCancel).toEqual(buttonCancel.state.value);
        });

        it('should not have buttonConfirm state when buttonConfirm is not provided', () =>
        {
            const modal = setupViewmodel({ content: renderableViewmodelMock });

            expect(modal.state.value.buttonConfirm).toBeUndefined();
        });

        it('should not have buttonCancel state when buttonCancel is not provided', () =>
        {
            const modal = setupViewmodel({ content: renderableViewmodelMock });

            expect(modal.state.value.buttonCancel).toBeUndefined();
        });

        it('should not be disabled by default', () =>
        {
            const modal = setupViewmodel({ content: renderableViewmodelMock });

            expect(modal.state.value.isDisabled).toBe(false);
        });

        it('should have isInline: false by default', () =>
        {
            const modal = setupViewmodel({ content: renderableViewmodelMock });

            expect(modal.state.value.isInline).toBe(false);
        });
    });

    describe('enable', () =>
    {
        it('should set isDisabled to false', () =>
        {
            const modal = setupViewmodel({ content: renderableViewmodelMock });

            modal.disable();
            modal.enable();

            expect(modal.state.value.isDisabled).toBe(false);
        });

        it('should enable buttonConfirmViewmodel if present', () =>
        {
            const buttonConfirm = createButtonGeneralViewmodelMock();

            const modal = setupViewmodel({
                content: renderableViewmodelMock,
                buttonConfirm
            });

            modal.disable();
            modal.enable();

            expect(buttonConfirm.enable).toHaveBeenCalled();
        });

        it('should enable buttonCancelViewmodel if present', () =>
        {
            const buttonCancel = createButtonGeneralViewmodelMock();

            const modal = setupViewmodel({
                content: renderableViewmodelMock,
                buttonCancel
            });

            modal.disable();
            modal.enable();

            expect(buttonCancel.enable).toHaveBeenCalled();
        });
    });

    describe('disable', () =>
    {
        it('should set isDisabled to true', () =>
        {
            const modal = setupViewmodel({ content: renderableViewmodelMock });

            modal.disable();

            expect(modal.state.value.isDisabled).toBe(true);
        });

        it('should disable buttonConfirmViewmodel if present', () =>
        {
            const buttonConfirm = createButtonGeneralViewmodelMock();

            const modal = setupViewmodel({
                content: renderableViewmodelMock,
                buttonConfirm
            });

            modal.disable();

            expect(buttonConfirm.disable).toHaveBeenCalled();
        });

        it('should disable buttonCancelViewmodel if present', () =>
        {
            const buttonCancel = createButtonGeneralViewmodelMock();

            const modal = setupViewmodel({
                content: renderableViewmodelMock,
                buttonCancel
            });

            modal.disable();

            expect(buttonCancel.disable).toHaveBeenCalled();
        });
    });

    describe('overlay element', () =>
    {
        it('should have state.elementType === OverlayElementType.Modal', () =>
        {
            const modal = setupViewmodel({ content: renderableViewmodelMock });

            expect(modal.state.value.elementType).toBe(OverlayElementType.modal);
        });
    });

    describe('close', () =>
    {
        it('should call onClose handler when closed', () =>
        {
            const onClose = vi.fn();

            const modal = setupViewmodel({
                content: renderableViewmodelMock,
                onClose
            });

            modal.close();

            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });

    describe('dispose', () =>
    {
        it('should dispose content viewmodel', () =>
        {
            const modal = setupViewmodel({ content: renderableViewmodelMock });

            modal[Symbol.dispose]();

            expect(renderableViewmodelMock[Symbol.dispose]).toHaveBeenCalled();
        });

        it('should dispose buttonConfirmViewmodel if present', () =>
        {
            const buttonConfirm = createButtonGeneralViewmodelMock();

            const modal = setupViewmodel({
                content: renderableViewmodelMock,
                buttonConfirm
            });

            modal[Symbol.dispose]();

            expect(buttonConfirm[Symbol.dispose]).toHaveBeenCalled();
        });

        it('should dispose buttonCancelViewmodel if present', () =>
        {
            const buttonCancel = createButtonGeneralViewmodelMock();

            const modal = setupViewmodel({
                content: renderableViewmodelMock,
                buttonCancel
            });

            modal[Symbol.dispose]();

            expect(buttonCancel[Symbol.dispose]).toHaveBeenCalled();
        });
    });
});