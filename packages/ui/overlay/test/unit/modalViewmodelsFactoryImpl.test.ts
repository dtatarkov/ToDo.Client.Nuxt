import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ModalViewmodelsFactoryImpl } from '../../src/factories/modalViewmodelsFactoryImpl';
import { messagesServiceMock } from '@client/infrastructure-messages/mocks';
import { createUiKitViewmodelsFactoryMock } from '@client/ui-uikit/mocks';
import { createButtonGeneralViewmodelMock } from '@client/ui-uikit/mocks';
import { createViewmodelMock, viewmodelMock } from '@client/ui-core/mocks';
import type { ModalButtonConfirmConfigurator } from '../../src';

function createFactory(): ModalViewmodelsFactoryImpl
{
    const uikitMock = createUiKitViewmodelsFactoryMock();

    uikitMock.createButtonGeneral.mockImplementation(() => createButtonGeneralViewmodelMock());

    return new ModalViewmodelsFactoryImpl(uikitMock, messagesServiceMock);
}

describe('ModalViewmodelsFactoryImpl', () =>
{
    let factory: ModalViewmodelsFactoryImpl;

    beforeEach(() =>
    {
        vi.clearAllMocks();
        factory = createFactory();
    });

    describe('create', () =>
    {
        it('should create modal with provided title', () =>
        {
            const modal = factory.create({
                title: 'Test title',
                content: viewmodelMock,
            });

            expect(modal.state.value.title).toBe('Test title');
        });

        it('should create modal with provided content', () =>
        {
            const content = createViewmodelMock({ foo: 'bar' });

            const modal = factory.create({
                title: 'Test title',
                content,
            });

            expect(modal.state.value.content).toEqual(content.state.value);
        });

        it('should create modal with provided description', () =>
        {
            const modal = factory.create({
                title: 'Test title',
                description: 'Test description',
                content: viewmodelMock,
            });

            expect(modal.state.value.description).toBe('Test description');
        });

        it('should create modal with buttonConfirm (configurator fn invoked)', () =>
        {
            const configuratorFn = vi.fn((configurator: ModalButtonConfirmConfigurator) => configurator.asCreateButton());

            const modal = factory.create({
                title: 'Test title',
                content: viewmodelMock,
                buttonConfirm: configuratorFn,
            });

            expect(configuratorFn).toHaveBeenCalledTimes(1);
            expect(modal.state.value.buttonConfirm).toBeDefined();
        });

        it('should create modal with buttonCancel', () =>
        {
            const modal = factory.create({
                title: 'Test title',
                content: viewmodelMock,
                buttonCancel: true,
            });

            expect(modal.state.value.buttonCancel).toBeDefined();
        });

        it('should create modal with all fields', () =>
        {
            const configuratorFn = vi.fn((configurator: ModalButtonConfirmConfigurator) => configurator.asCreateButton());

            const content = createViewmodelMock({ foo: 'bar' });

            const modal = factory.create({
                title: 'Test title',
                description: 'Test description',
                content,
                buttonConfirm: configuratorFn,
                buttonCancel: true,
            });

            expect(modal.state.value.title).toBe('Test title');
            expect(modal.state.value.description).toBe('Test description');
            expect(modal.state.value.content).toBe(content.state.value);
            expect(modal.state.value.buttonConfirm).toBeDefined();
            expect(modal.state.value.buttonCancel).toBeDefined();
        });

        it('should not create buttonConfirm when buttonConfirm omitted', () =>
        {
            const modal = factory.create({
                title: 'Test title',
                content: viewmodelMock,
            });

            expect(modal.state.value.buttonConfirm).toBeUndefined();
        });

        it('should not create buttonCancel when buttonCancel omitted', () =>
        {
            const modal = factory.create({
                title: 'Test title',
                content: viewmodelMock,
            });

            expect(modal.state.value.buttonCancel).toBeUndefined();
        });
    });
});
