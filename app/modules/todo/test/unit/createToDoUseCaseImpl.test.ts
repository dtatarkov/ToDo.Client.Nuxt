import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateToDoUseCaseImpl } from '../../usecases/createToDoUseCaseImpl';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';
import { createToDoMock } from '../../mocks/todoMock';

// Reset mocks before each test
describe('CreateToDoUseCaseImpl', () =>
{
    const useCase = new CreateToDoUseCaseImpl(
        todosOwnerMock,
    );

    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('execute', () =>
    {
        it('should create a new todo and show its form', () =>
        {
            const todo = createToDoMock();
            todosOwnerMock.createToDo.mockReturnValue(todo);

            useCase.execute();

            expect(todosOwnerMock.createToDo).toHaveBeenCalledTimes(1);
            expect(todo.showForm).toHaveBeenCalledTimes(1);
        });
    });
});