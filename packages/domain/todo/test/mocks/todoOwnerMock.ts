import { vi } from 'vitest';
import type { ToDosStore } from '../../src/entities/todosStore';
import type { ToDo } from '../../src/entities/todo';
import { createObservableReadonlyMock } from '@client/shared/mocks';

export const todosOwnerMock = {
    todos: createObservableReadonlyMock(new Array<ToDo>()),

    getToDoByIdAsync: vi.fn(),
    updateToDosAsync: vi.fn(),
    initializeToDosAsync: vi.fn(),
    saveToDoAsync: vi.fn(),
    createToDo: vi.fn(),

    [Symbol.dispose]: vi.fn(),
} satisfies ToDosStore;