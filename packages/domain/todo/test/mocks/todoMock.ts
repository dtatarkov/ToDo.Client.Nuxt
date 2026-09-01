import { vi } from 'vitest';
import type { ToDo } from '../../src';
import type { ToDoData } from '../../src/types/todoData';

const defaultToDoData: ToDoData = {
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
};

export function createToDoMock(data?: Partial<ToDoData>)
{
    const fullData: ToDoData = {
        ...defaultToDoData,
        ...data,
    };

    return {
        ...fullData,
        getData: () => fullData,
        setData: vi.fn(),
        clone: vi.fn(),
        getUpdateScheme: vi.fn()
    } satisfies ToDo;
};