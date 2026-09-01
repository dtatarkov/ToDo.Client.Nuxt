import { vi } from 'vitest';
import type { ToDoFactory } from '../../src/factories/todoFactory';
import { createToDoMock } from './todoMock';

export const todoFactoryMock = {
    create: vi.fn(data => createToDoMock(data)),
} satisfies ToDoFactory;