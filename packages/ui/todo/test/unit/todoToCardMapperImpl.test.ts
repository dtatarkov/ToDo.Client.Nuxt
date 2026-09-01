import { describe, it, expect } from 'vitest';
import type { ToDoData } from '@client/domain-todo';
import { ToDoToCardMapperImpl } from '../../src/mappers/todoToCardMapperImpl';

describe('map', () =>
{
    it('should map todo to card data', () =>
    {
        const mapper = new ToDoToCardMapperImpl();

        const todo: ToDoData = {
            id: '1',
            title: 'Test Task',
            description: 'Test Description',
            completionDatePlanned: new Date('2026-01-15'),
            completionDateActual: new Date('2026-01-10'),
        };

        const card = mapper.map(todo);

        expect(card.id).toBe(todo.id);
        expect(card.title).toBe(todo.title);
        expect(card.description).toBe(todo.description);
        expect(card.completionDatePlanned).toEqual(todo.completionDatePlanned);
        expect(card.completionDateActual).toEqual(todo.completionDateActual);
    });
})

