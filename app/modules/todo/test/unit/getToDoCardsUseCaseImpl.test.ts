import { GetToDoCardsUseCaseImpl } from '@/modules/todo/usecases/getToDoCardsUseCaseImpl';
import type { GetToDosUseCase } from '@/modules/todo/interfaces/getToDosUseCase';
import type { ToDoCardDataMapper } from '@/modules/todo/interfaces/todoCardDataMapper';
import type { ToDo } from '@/modules/todo/interfaces/todo';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ToDoCardDataWithIdentity } from '../../types/todoCardData';

describe('GetToDoCardsUseCaseImpl', () =>
{
  const getToDosUseCaseMock = {
    execute: vi.fn()
  } satisfies GetToDosUseCase;

  const todoCardDataMapperMock = {
    mapToCardData: vi.fn()
  } satisfies ToDoCardDataMapper;

  const getToDoCardsUseCase = new GetToDoCardsUseCaseImpl(getToDosUseCaseMock, todoCardDataMapperMock);

  const mockTodo: ToDo = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    completionDatePlanned: undefined,
    completionDateActual: undefined,
    owner: undefined,
    isNew: false,
    getData: vi.fn(),
    toObservableData: vi.fn(),
    clone: vi.fn(),
    saveAsync: vi.fn(),
    showEditDialog: vi.fn(),
  };

  const mockCardData: ToDoCardDataWithIdentity = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    completionDateActual: undefined,
    completionDatePlanned: undefined
  };

  beforeEach(() =>
  {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  it('should return card data when execute is called', () =>
  {
    getToDosUseCaseMock.execute.mockReturnValue(new ObservableSource([mockTodo]));
    todoCardDataMapperMock.mapToCardData.mockReturnValue(mockCardData);

    const result = getToDoCardsUseCase.execute();

    expect(result.value).toEqual([mockCardData]);
    expect(getToDosUseCaseMock.execute).toHaveBeenCalled();
    expect(todoCardDataMapperMock.mapToCardData).toHaveBeenCalledWith(mockTodo);
  });
});