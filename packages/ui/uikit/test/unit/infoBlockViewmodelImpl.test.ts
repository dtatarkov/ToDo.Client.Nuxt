import { describe, it, expect, beforeEach } from 'vitest';
import { InfoBlockViewmodelImpl } from '../../src/viewmodels/infoBlockViewmodelImpl';

describe('InfoBlockViewmodelImpl', () =>
{
    let viewmodel: InfoBlockViewmodelImpl;

    beforeEach(() =>
    {
        viewmodel = new InfoBlockViewmodelImpl();
    });

    describe('constructor', () =>
    {
        it('should initialize with empty rows array and hasRows false', () =>
        {
            expect(viewmodel.state.value).toEqual({
                rows: [],
                hasRows: false,
            });
        });
    });

    describe('addRow', () =>
    {
        it('should add a row with labelKey and content', () =>
        {
            viewmodel.addRow('todo.card.completeBy', 'Content 1');

            expect(viewmodel.state.value.rows).toHaveLength(1);

            expect(viewmodel.state.value.rows[0]).toEqual({
                labelKey: 'todo.card.completeBy',
                content: 'Content 1',
            });

            expect(viewmodel.state.value.hasRows).toBe(true);
        });

        it('should add multiple rows in order', () =>
        {
            viewmodel.addRow('todo.card.completeBy', 'Content 1');
            viewmodel.addRow('todo.card.completed', 'Content 2');

            expect(viewmodel.state.value.rows).toHaveLength(2);
            expect(viewmodel.state.value.rows[0]).toEqual({ labelKey: 'todo.card.completeBy', content: 'Content 1' });
            expect(viewmodel.state.value.rows[1]).toEqual({ labelKey: 'todo.card.completed', content: 'Content 2' });
            expect(viewmodel.state.value.hasRows).toBe(true);
        });

        it('should update hasRows when adding rows', () =>
        {
            expect(viewmodel.state.value.hasRows).toBe(false);

            viewmodel.addRow('todo.card.completeBy', 'Content 1');
            expect(viewmodel.state.value.hasRows).toBe(true);
        });
    });

    describe('clear', () =>
    {
        it('should clear all rows', () =>
        {
            viewmodel.addRow('todo.card.completeBy', 'Content 1');
            viewmodel.addRow('todo.card.completed', 'Content 2');

            expect(viewmodel.state.value.rows).toHaveLength(2);

            viewmodel.clear();

            expect(viewmodel.state.value.rows).toHaveLength(0);
            expect(viewmodel.state.value.hasRows).toBe(false);
        });
    });
});
