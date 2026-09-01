import { vi } from 'vitest';
import type { ToDoStore } from '../../src/entities/todoStore';
import type { ToDoData } from '../../src/types/todoData';
import { createObservableReadonlyMock } from '@client/shared/mocks';

export const todoStoreMock = {
    todos: createObservableReadonlyMock(new Array<ToDoData>()),

    getToDoByIdAsync: vi.fn(),
    updateToDosAsync: vi.fn(),
    initializeToDosAsync: vi.fn(),
    addToDoAsync: vi.fn(),
    updateToDoAsync: vi.fn(),
    getAddScheme: vi.fn(),
    getUpdateSchemeAsync: vi.fn(),

    [Symbol.dispose]: vi.fn(),
} satisfies ToDoStore;