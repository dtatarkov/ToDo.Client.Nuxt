import { ToDoCardDataMapperImpl } from '@/modules/todo/mappers/todoCardDataMapperImpl';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ToDo } from '@/modules/todo/entities/todo';
import type { ToDoData } from '../../types/todoData';

describe('ToDoCardDataMapperImpl', () =>
{
  const mapper = new ToDoCardDataMapperImpl();

  function createMockTodo(data?: Partial<ToDoData>): ToDo
  {
    const fullData: ToDoData = {
      id: '',
      title: '',
      description: '',
      completionDatePlanned: undefined,
      completionDateActual: undefined,

      ...data
    };

    return {
      ...fullData,
      owner: undefined,
      isNew: false,
      getData: vi.fn(),
      clone: vi.fn(),
      saveAsync: vi.fn(),
    };
  }

  beforeEach(() =>
  {
    vi.resetAllMocks();
  });

  it('should map todo to card data correctly', () =>
  {
    const mockToDo = createMockTodo({
      id: '1',
      title: 'Test Title',
      description: 'Test Description',
      completionDatePlanned: new Date('2024-01-01'),
      completionDateActual: new Date('2024-01-02')
    });

    const expectedCardData = {
      id: '1',
      title: 'Test Title',
      description: 'Test Description',
      completionDatePlanned: new Date('2024-01-01'),
      completionDateActual: new Date('2024-01-02')
    };

    const result = mapper.mapToCardData(mockToDo);

    expect(result).toEqual(expectedCardData);
  });

  it('should handle todo with empty completion dates', () =>
  {
    const mockToDo = createMockTodo({
      id: '1',
      title: 'Test Title',
      description: 'Test Description',
    });

    const expectedCardData = {
      id: '1',
      title: 'Test Title',
      description: 'Test Description',
    };

    const result = mapper.mapToCardData(mockToDo);

    expect(result).toEqual(expectedCardData);
  });
});