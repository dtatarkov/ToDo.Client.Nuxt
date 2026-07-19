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
            viewmodel.addRow('key1', 'Content 1');

            expect(viewmodel.state.value.rows).toHaveLength(1);

            expect(viewmodel.state.value.rows[0]).toEqual({
                labelKey: 'key1',
                content: 'Content 1',
            });

            expect(viewmodel.state.value.hasRows).toBe(true);
        });

        it('should add multiple rows in order', () =>
        {
            viewmodel.addRow('key1', 'Content 1');
            viewmodel.addRow('key2', 'Content 2');
            viewmodel.addRow('key3', 'Content 3');

            expect(viewmodel.state.value.rows).toHaveLength(3);
            expect(viewmodel.state.value.rows[0]).toEqual({ labelKey: 'key1', content: 'Content 1' });
            expect(viewmodel.state.value.rows[1]).toEqual({ labelKey: 'key2', content: 'Content 2' });
            expect(viewmodel.state.value.rows[2]).toEqual({ labelKey: 'key3', content: 'Content 3' });
            expect(viewmodel.state.value.hasRows).toBe(true);
        });

        it('should update hasRows when adding rows', () =>
        {
            expect(viewmodel.state.value.hasRows).toBe(false);

            viewmodel.addRow('key1', 'Content 1');
            expect(viewmodel.state.value.hasRows).toBe(true);
        });
    });

    describe('clear', () =>
    {
        it('should clear all rows', () =>
        {
            viewmodel.addRow('key1', 'Content 1');
            viewmodel.addRow('key2', 'Content 2');
            viewmodel.addRow('key3', 'Content 3');

            expect(viewmodel.state.value.rows).toHaveLength(3);

            viewmodel.clear();

            expect(viewmodel.state.value.rows).toHaveLength(0);
            expect(viewmodel.state.value.hasRows).toBe(false);
        });
    });
});
