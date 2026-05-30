import { ToDoCardDataMapperImpl } from '@/modules/todo/mappers/todoCardDataMapperImpl';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createToDoMock } from '../../mocks/todoMock';

describe('ToDoCardDataMapperImpl', () =>
{
  const mapper = new ToDoCardDataMapperImpl();

  beforeEach(() =>
  {
    vi.resetAllMocks();
  });

  it('should map todo to card data correctly', () =>
  {
    const mockToDo = createToDoMock({
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
    const mockToDo = createToDoMock({
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