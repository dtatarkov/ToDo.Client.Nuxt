import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EditToDoUseCaseImpl } from '../../usecases/editToDoUseCaseImpl';
import { ToDoNotFoundException } from '../../exceptions/toDoNotFoundException';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';
import { createToDoMock } from '../../mocks/todoMock';

describe('EditToDoUseCaseImpl', () =>
{
    const useCase = new EditToDoUseCaseImpl(
        todosOwnerMock,
    );

    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('executeAsync', () =>
    {
        it('should fetch todo by id and show its form', async () =>
        {
            const todo = createToDoMock({ id: '123' });
            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(todo);

            await useCase.executeAsync('123');

            expect(todosOwnerMock.getToDoByIdAsync).toHaveBeenCalledTimes(1);
            expect(todosOwnerMock.getToDoByIdAsync).toHaveBeenCalledWith('123');
            expect(todo.showForm).toHaveBeenCalledTimes(1);
        });

        it('should throw ToDoNotFoundException for non-existent todo', async () =>
        {
            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(undefined);

            await expect(useCase.executeAsync('999')).rejects.toThrow(ToDoNotFoundException);
        });
    });
});