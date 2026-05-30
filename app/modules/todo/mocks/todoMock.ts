import { vi } from 'vitest';
import type { ToDoData } from '../types/todoData';
import type { ToDosOwner } from '../entities/todosOwner';

const defaultToDoData: ToDoData = {
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
};

export function createMockToDo(data?: Partial<ToDoData>, owner?: ToDosOwner, isNew = false)
{
    const fullData: ToDoData = {
        ...defaultToDoData,
        ...data,
    };

    return {
        ...fullData,
        owner,
        isNew,
        getData: vi.fn().mockReturnValue(fullData),
        clone: vi.fn(),
        saveAsync: vi.fn(),
        toObservableData: vi.fn()
    };
};