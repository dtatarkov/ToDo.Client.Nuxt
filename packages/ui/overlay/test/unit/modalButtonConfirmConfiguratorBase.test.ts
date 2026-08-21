import { describe, it, expect } from 'vitest';
import { ModalButtonConfirmConfiguratorBase } from '../../src/entities/modalButtonConfirmConfiguratorBase';
import { AsyncCommandGeneric } from '@client/shared';
import { createButtonGeneralViewmodelMock } from '@client/ui-uikit/mocks';

function setupViewModel()
{
    const button = createButtonGeneralViewmodelMock();
    const configurator = new ModalButtonConfirmConfiguratorBase(button);

    return { button, configurator };
}

describe('ModalButtonConfirmConfiguratorBase', () =>
{
    describe('withCommand', () =>
    {
        it('sets command', () =>
        {
            const { button, configurator } = setupViewModel();

            const command = new AsyncCommandGeneric(async () => { });
            const result = configurator.withCommand(command);

            expect(button.setCommand).toHaveBeenCalledWith(command);
            expect(result).toBe(configurator);
        });
    });

    describe('asCreateButton', () =>
    {
        it('sets color to primary', () =>
        {
            const { button, configurator } = setupViewModel();
            configurator.asCreateButton();

            expect(button.setColor).toHaveBeenCalledWith('primary');
        });

        it('sets title to button.create', () =>
        {
            const { button, configurator } = setupViewModel();
            configurator.asCreateButton();

            expect(button.setTitle).toHaveBeenCalledWith('button.create');
        });
    });

    describe('asEditButton', () =>
    {
        it('sets color to primary', () =>
        {
            const { button, configurator } = setupViewModel();
            configurator.asEditButton();

            expect(button.setColor).toHaveBeenCalledWith('primary');
        });

        it('sets title to button.save', () =>
        {
            const { button, configurator } = setupViewModel();
            configurator.asEditButton();

            expect(button.setTitle).toHaveBeenCalledWith('button.save');
        });
    });
});
