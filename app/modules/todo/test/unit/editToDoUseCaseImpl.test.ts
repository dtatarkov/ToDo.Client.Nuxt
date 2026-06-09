import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EditToDoUseCaseImpl } from '../../usecases/editToDoUseCaseImpl';
import { ToDoNotFoundException } from '../../exceptions/toDoNotFoundException';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';
import { formFactoryMock as formFactoryMock } from '@/modules/forms/mocks/formFactoryMock';
import { createToDoMock } from '../../mocks/todoMock';
import { formMock } from '../../../forms/mocks/formMock';
import { addFormModalUseCaseMock } from '@/modules/overlay/mocks/addFormModalUseCaseMock';
import { modalMock } from '@/modules/overlay/mocks/modalMock';
import { modalConfirmButtonConfiguratorMock } from '../../../overlay/mocks/modalConfirmButtonConfiguratorMock';

describe('EditToDoUseCaseImpl', () =>
{
    const useCase = new EditToDoUseCaseImpl(
        todosOwnerMock,
        formFactoryMock,
        addFormModalUseCaseMock
    );

    beforeEach(() =>
    {
        vi.resetAllMocks();

        // Setup mocks
        formFactoryMock.create.mockReturnValue(formMock);
        addFormModalUseCaseMock.execute.mockReturnValue(modalMock);
        modalMock.addButtonConfirm.mockReturnValue(modalConfirmButtonConfiguratorMock);
    });

    describe('executeAsync', () =>
    {
        it('should fetch todo by id and create edit form', async () =>
        {
            const todo = createToDoMock({ id: '123' });
            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(todo);

            await useCase.executeAsync('123');

            expect(todosOwnerMock.getToDoByIdAsync).toHaveBeenCalledTimes(1);
            expect(todosOwnerMock.getToDoByIdAsync).toHaveBeenCalledWith('123');
            expect(formFactoryMock.create).toHaveBeenCalledTimes(1);
            expect(addFormModalUseCaseMock.execute).toHaveBeenCalledTimes(1);
            expect(addFormModalUseCaseMock.execute).toHaveBeenCalledWith(formMock);
        });

        it('should throw ToDoNotFoundException for non-existent todo', async () =>
        {
            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(undefined);

            await expect(useCase.executeAsync('999')).rejects.toThrow(ToDoNotFoundException);
        });

        it('should pass scheme to form', async () =>
        {
            const todo = createToDoMock({ id: '123' });
            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(todo);

            await useCase.executeAsync('123');

            expect(formMock.setElementsFromScheme).toHaveBeenCalledTimes(1);
        });

        it('should set form data from todo', async () =>
        {
            const todo = createToDoMock({ id: '123' });
            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(todo);

            await useCase.executeAsync('123');

            expect(formMock.setData).toHaveBeenCalledTimes(1);
            expect(formMock.setData).toHaveBeenCalledWith(todo.getData());
        });
    });
});