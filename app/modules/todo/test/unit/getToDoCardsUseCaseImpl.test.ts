import { GetToDoCardsUseCaseImpl } from '@/modules/todo/usecases/getToDoCardsUseCaseImpl';
import type { ToDoData } from '@/modules/todo/interfaces/todo';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ToDoCardViewmodelData } from '../../interfaces/todoCardViewmodel';
import type { ToDoCardDataMapper } from '../../interfaces/todoCardDataMapper';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';

describe('GetToDoCardsUseCaseImpl', () =>
{
  const todoCardDataMapper = {
    mapToCardData: vi.fn(),
  } satisfies ToDoCardDataMapper;

  const getToDoCardsUseCase = new GetToDoCardsUseCaseImpl(todosOwnerMock, todoCardDataMapper);

  function createMockTodoData(id: string)
  {
    return {
      id,
      title: 'Test Todo',
      description: 'Test Description',
      completionDatePlanned: undefined,
      completionDateActual: undefined,
    } satisfies ToDoData;
  }

  function createMockCardViewmodelData(id: string)
  {
    return {
      id,
      title: 'Test Todo',
      description: 'Test Description',
      completionDatePlanned: undefined,
      completionDateActual: undefined,
    } satisfies ToDoCardViewmodelData;
  }

  beforeEach(() =>
  {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  it('should return card viewmodels when execute is called', () =>
  {
    const mockToDo = createMockTodoData('1');
    const mockCardData = createMockCardViewmodelData('1');

    todosOwnerMock.getAllToDos.mockReturnValue([mockToDo]);
    todoCardDataMapper.mapToCardData.mockReturnValue(mockCardData);

    const result = getToDoCardsUseCase.execute();

    expect(result.value).toEqual([mockCardData]);
    expect(todosOwnerMock.getAllToDos).toHaveBeenCalled();
    expect(todoCardDataMapper.mapToCardData).toHaveBeenCalledWith(mockToDo);
  });

  it('should handle empty todos list', () =>
  {
    todosOwnerMock.getAllToDos.mockReturnValue([]);

    const result = getToDoCardsUseCase.execute();

    expect(result.value).toEqual([]);
    expect(todosOwnerMock.getAllToDos).toHaveBeenCalled();
    expect(todoCardDataMapper.mapToCardData).not.toHaveBeenCalled();
  });

  it('should handle multiple todos', () =>
  {
    const mockToDo1 = createMockTodoData('1');
    const mockCard1 = createMockCardViewmodelData('1');

    const mockToDo2 = createMockTodoData('2');
    const mockCard2 = createMockCardViewmodelData('2');

    todosOwnerMock.getAllToDos.mockReturnValue([mockToDo1, mockToDo2]);

    todoCardDataMapper.mapToCardData
      .mockReturnValueOnce(mockCard1)
      .mockReturnValueOnce(mockCard2);

    const result = getToDoCardsUseCase.execute();

    expect(result.value).toEqual([mockCard1, mockCard2]);
    expect(todosOwnerMock.getAllToDos).toHaveBeenCalled();
    expect(todoCardDataMapper.mapToCardData).toHaveBeenCalledTimes(2);
    expect(todoCardDataMapper.mapToCardData).toHaveBeenCalledWith(mockToDo1);
    expect(todoCardDataMapper.mapToCardData).toHaveBeenCalledWith(mockToDo2);
  });
});