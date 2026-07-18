import { vi } from 'vitest';
import type { ToDosOwner } from '../../src/entities/todosOwner';
import type { ToDo } from '../../src/entities/todo';
import { createObservableArrayMock } from '@client/shared/mocks';

export const todosOwnerMock = {
    todos: createObservableArrayMock<ToDo>(),

    getAllToDos: vi.fn(),
    getToDoByIdAsync: vi.fn(),
    updateToDosAsync: vi.fn(),
    initializeToDosAsync: vi.fn(),
    saveToDoAsync: vi.fn(),
    createToDo: vi.fn(),

    [Symbol.dispose]: vi.fn(),
} satisfies ToDosOwner;