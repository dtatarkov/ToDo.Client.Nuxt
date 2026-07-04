import { vi } from 'vitest';
import type { ToDosOwner } from '../entities/todosOwner';

export const todosOwnerMock = {
    getAllToDos: vi.fn(),
    getToDoByIdAsync: vi.fn(),
    updateToDosAsync: vi.fn(),
    initializeToDosAsync: vi.fn(),
    saveToDoAsync: vi.fn(),
    createToDo: vi.fn(),
    onToDosChange: vi.fn(),
    [Symbol.dispose]: vi.fn(),
} satisfies ToDosOwner;