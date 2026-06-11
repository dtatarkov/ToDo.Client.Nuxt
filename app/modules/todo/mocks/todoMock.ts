import { vi } from 'vitest';
import type { ToDoData } from '../types/todoData';
import type { ToDosOwner } from '../entities/todosOwner';
import type { ToDo } from '../entities/todo';

const defaultToDoData: ToDoData = {
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
};

export function createToDoMock(data?: Partial<ToDoData>, owner?: ToDosOwner)
{
    const fullData: ToDoData = {
        ...defaultToDoData,
        ...data,
    };

    return {
        ...fullData,
        owner,
        isNew: fullData.id === '',
        getEditScheme: vi.fn(),
        getAddScheme: vi.fn(),
        getData: () => fullData,
        clone: vi.fn(),
        saveAsync: vi.fn(),
        showForm: vi.fn(),
    } satisfies ToDo;
};