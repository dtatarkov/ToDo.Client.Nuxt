import { vi } from 'vitest';
import type { ToDosRepository } from '../../src/repositories/todosRepository';

export const todoRepositoryMock = {
    getAllToDosAsync: vi.fn(),
    addToDoAsync: vi.fn(),
    updateToDoAsync: vi.fn(),
} satisfies ToDosRepository;