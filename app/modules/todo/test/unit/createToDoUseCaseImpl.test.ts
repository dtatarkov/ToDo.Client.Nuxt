import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateToDoUseCaseImpl } from '../../usecases/createToDoUseCaseImpl';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';
import { formFactoryMock as formFactoryMock } from '@/modules/forms/mocks/formFactoryMock';
import { createToDoMock } from '../../mocks/todoMock';
import { formMock } from '../../../forms/mocks/formMock';
import { modalMock } from '../../../overlay/mocks/modalMock';
import { addFormModalUseCaseMock } from '@/modules/overlay/mocks/addFormModalUseCaseMock';
import { modalConfirmButtonConfiguratorMock } from '@/modules/overlay/mocks/modalConfirmButtonConfiguratorMock';

// Reset mocks before each test
describe('CreateToDoUseCaseImpl', () =>
{
    const useCase = new CreateToDoUseCaseImpl(
        todosOwnerMock,
        formFactoryMock,
        addFormModalUseCaseMock
    );

    beforeEach(() =>
    {
        vi.resetAllMocks();

        const todo = createToDoMock();

        // Setup mocks
        formFactoryMock.create.mockReturnValue(formMock);
        addFormModalUseCaseMock.execute.mockReturnValue(modalMock);
        todosOwnerMock.createToDo.mockReturnValue(todo);
        modalMock.addButtonConfirm.mockReturnValue(modalConfirmButtonConfiguratorMock);
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