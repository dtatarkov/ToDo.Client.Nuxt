import { vi } from 'vitest';
import type { ToDoStore } from '../../src/entities/todoStore';
import type { ToDo } from '../../src/entities/todo';
import { createObservableReadonlyMock } from '@client/shared/mocks';

export const todoStoreMock = {
    todos: createObservableReadonlyMock(new Array<ToDo>()),

    getToDoByIdAsync: vi.fn(),
    updateToDosAsync: vi.fn(),
    initializeToDosAsync: vi.fn(),
    saveToDoAsync: vi.fn(),
    createToDo: vi.fn(),

    [Symbol.dispose]: vi.fn(),
} satisfies ToDoStore;