import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateToDoUseCaseImpl } from '../../usecases/createToDoUseCaseImpl';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';
import { formFactoryMock as formFactoryMock } from '@/modules/forms/mocks/formFactoryMock';
import { createToDoMock } from '../../mocks/todoMock';
import { formMock } from '../../../forms/mocks/formMock';
import { modalMock } from '../../../overlay/mocks/modalMock';
import { modalConfirmButtonConfiguratorMock } from '@/modules/overlay/mocks/modalConfirmButtonConfiguratorMock';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';
import { modalConfiguratorMock } from '@/modules/overlay/mocks/modalConfiguratorMock';

// Reset mocks before each test
describe('CreateToDoUseCaseImpl', () =>
{
    const useCase = new CreateToDoUseCaseImpl(
        todosOwnerMock,
        overlayMock,
        formFactoryMock,
    );

    beforeEach(() =>
    {
        vi.resetAllMocks();

        const todo = createToDoMock();

        // Setup mocks
        formFactoryMock.create.mockReturnValue(formMock);
        overlayMock.createModal.mockReturnValue(modalConfiguratorMock);
        todosOwnerMock.createToDo.mockReturnValue(todo);
        modalConfiguratorMock.setContent.mockReturnValue(modalConfiguratorMock);
        modalConfiguratorMock.addButtonConfirm.mockReturnValue(modalConfirmButtonConfiguratorMock);
        modalConfiguratorMock.addButtonCancel.mockReturnValue(modalConfiguratorMock);
        modalConfiguratorMock.init.mockReturnValue(modalMock);
        modalConfirmButtonConfiguratorMock.asCreateButton.mockReturnValue(modalConfiguratorMock);
        modalConfirmButtonConfiguratorMock.asEditButton.mockReturnValue(modalConfiguratorMock);
    });

    describe('execute', () =>
    {
        it('should create a new todo', () =>
        {
            useCase.execute();

            expect(todosOwnerMock.createToDo).toHaveBeenCalledTimes(1);
        });

        it('should pass scheme to form', () =>
        {
            useCase.execute();

            expect(formFactoryMock.create).toHaveBeenCalledTimes(1);
            expect(formMock.setElementsFromScheme).toHaveBeenCalledTimes(1);
        });

        it('should set form data from todo', () =>
        {
            useCase.execute();

            expect(formMock.setData).toHaveBeenCalledTimes(1);
        });
    });
});