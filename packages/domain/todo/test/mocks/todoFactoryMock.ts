import { vi } from 'vitest';
import type { ToDoFactory } from '../../src/factories/todoFactory';

export const todoFactoryMock = {
    create: vi.fn()
} satisfies ToDoFactory;