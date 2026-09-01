import { vi } from 'vitest';
import type { ToDoToCardMapper } from '../src/mappers/todoToCardMapper';

export const todoToCardMapperMock = {
    map: vi.fn(),
} satisfies ToDoToCardMapper;
