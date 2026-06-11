import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EditToDoUseCaseImpl } from '../../usecases/editToDoUseCaseImpl';
import { ToDoNotFoundException } from '../../exceptions/toDoNotFoundException';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';
import { formFactoryMock as formFactoryMock } from '@/modules/forms/mocks/formFactoryMock';
import { createToDoMock } from '../../mocks/todoMock';
import { formMock } from '../../../forms/mocks/formMock';
import { modalMock } from '@/modules/overlay/mocks/modalMock';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';

describe('EditToDoUseCaseImpl', () =>
{
    const useCase = new EditToDoUseCaseImpl(
        todosOwnerMock,
        overlayMock,
        formFactoryMock,
    );

    beforeEach(() =>
    {
        vi.resetAllMocks();

        // Setup mocks
        formFactoryMock.create.mockReturnValue(formMock);
        overlayMock.createModal.mockReturnValue(modalMock);
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
            expect(overlayMock.createModal).toHaveBeenCalledTimes(1);
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