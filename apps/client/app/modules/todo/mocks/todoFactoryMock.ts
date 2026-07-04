import { vi } from 'vitest';
import type { ToDoFactory } from '../factories/todoFactory';

export const todoFactoryMock = {
    create: vi.fn()
} satisfies ToDoFactory;