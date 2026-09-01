import { describe, it, expect, vi } from 'vitest';
import { ModalViewmodelsFactoryImpl } from '../../src/factories/modalViewmodelsFactoryImpl';
import { createUiKitViewmodelsFactoryMock } from '@client/ui-uikit/mocks';
import { createButtonGeneralViewmodelMock } from '@client/ui-uikit/mocks';
import { createRenderableViewmodelMock, renderableViewmodelMock } from '@client/ui-core/mocks';
import type { ModalButtonConfirmConfigurator } from '../../src';

function setupFactory()
{
    const uikit = createUiKitViewmodelsFactoryMock();
    const factory = new ModalViewmodelsFactoryImpl(uikit);

    const onClose = vi.fn();

    return {
        uikit,
        factory,
        onClose
    };
}

describe('ModalViewmodelsFactoryImpl', () =>
{

    describe('create', () =>
    {
        it('should create modal with provided title', () =>
        {
            const { factory } = setupFactory();

            const modal = factory.create({
                title: 'Test title',
                content: renderableViewmodelMock,
            });

            expect(modal.state.value.title).toBe('Test title');
        });

        it('should create modal with provided content', () =>
        {
            const content = createRenderableViewmodelMock({ foo: 'bar' });
            const { factory } = setupFactory();

            const modal = factory.create({
                title: 'Test title',
                content,
            });

            expect(modal.state.value.content.data).toEqual(content.state.value);
        });

        it('should create modal with provided description', () =>
        {
            const { factory } = setupFactory();

            const modal = factory.create({
                title: 'Test title',
                description: 'Test description',
                content: renderableViewmodelMock,
            });

            expect(modal.state.value.description).toBe('Test description');
        });

        it('should create modal with buttonConfirm (configurator fn invoked)', () =>
        {
            const { factory, uikit } = setupFactory();

            const button = createButtonGeneralViewmodelMock();
            uikit.createButtonGeneral.mockImplementation(() => button);

            const configuratorFn = vi.fn((configurator: ModalButtonConfirmConfigurator) => configurator.asCreateButton());

            const modal = factory.create({
                title: 'Test title',
                content: renderableViewmodelMock,
                buttonConfirm: configuratorFn,
            });

            expect(configuratorFn).toHaveBeenCalledTimes(1);
            expect(modal.state.value.buttonConfirm).toBeDefined();
        });

        it('should create modal with buttonCancel', () =>
        {
            const { factory, uikit } = setupFactory();

            const button = createButtonGeneralViewmodelMock();
            uikit.createButtonGeneral.mockImplementation(() => button);

            const modal = factory.create({
                title: 'Test title',
                content: renderableViewmodelMock,
                buttonCancel: true,
            });

            expect(modal.state.value.buttonCancel).toBeDefined();
            expect(button.setTitle).toBeCalledWith('button.cancel');
        });

        it('should create modal with all fields', () =>
        {
            const { factory, uikit } = setupFactory();

            uikit.createButtonGeneral.mockImplementation(() => createButtonGeneralViewmodelMock());

            const configuratorFn = vi.fn((configurator: ModalButtonConfirmConfigurator) => configurator.asCreateButton());
            const content = createRenderableViewmodelMock({ foo: 'bar' });

            const modal = factory.create({
                title: 'Test title',
                description: 'Test description',
                content,
                buttonConfirm: configuratorFn,
                buttonCancel: true,
            });

            expect(modal.state.value.title).toBe('Test title');
            expect(modal.state.value.description).toBe('Test description');
            expect(modal.state.value.content.data).toEqual(content.state.value);
            expect(modal.state.value.buttonConfirm).toBeDefined();
            expect(modal.state.value.buttonCancel).toBeDefined();
        });

        it('should not create buttonConfirm when buttonConfirm omitted', () =>
        {
            const { factory } = setupFactory();

            const modal = factory.create({
                title: 'Test title',
                content: renderableViewmodelMock,
            });

            expect(modal.state.value.buttonConfirm).toBeUndefined();
        });

        it('should not create buttonCancel when buttonCancel omitted', () =>
        {
            const { factory } = setupFactory();

            const modal = factory.create({
                title: 'Test title',
                content: renderableViewmodelMock,
            });

            expect(modal.state.value.buttonCancel).toBeUndefined();
        });

        it('should pass onClose handler to vm', () =>
        {
            const { factory, onClose } = setupFactory();

            const modal = factory.create({
                title: 'Test title',
                content: renderableViewmodelMock,
            }, onClose);

            modal.close();

            expect(onClose).toBeCalled();
        });
    });
});
