import { vi } from 'vitest';
import type { ToDo } from '../../src';
import type { ToDoStore } from '../../src/entities/todoStore';
import type { ToDoData } from '../../src/types/todoData';

const defaultToDoData: ToDoData = {
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
};

export function createToDoMock(data?: Partial<ToDoData>, owner?: ToDoStore)
{
    const fullData: ToDoData = {
        ...defaultToDoData,
        ...data,
    };

    return {
        ...fullData,
        owner,
        isNew: fullData.id === '',
        getData: () => fullData,
        setData: vi.fn(),
        clone: vi.fn(),
        saveAsync: vi.fn(),
    } satisfies ToDo;
};