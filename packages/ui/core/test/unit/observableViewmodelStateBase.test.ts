import { describe, it, expect } from 'vitest';
import { ObservableViewmodelStateBase } from '../../src/entities/observableViewmodelStateBase';
import { EntityParseException, EntityScheme } from '@client/infrastructure-entity-schemes';
import { EntityDataUpdateException } from '@client/infrastructure-entity-schemes';

describe('ObservableViewmodelStateBase', () =>
{
    describe('without scheme', () =>
    {
        it('should update simple property values', () =>
        {
            const initialState = { name: 'John', age: 30 };
            const state = new ObservableViewmodelStateBase(initialState);

            state.update({ name: 'Jane' });

            expect(state.value).toEqual({ name: 'Jane', age: 30 });
        });

        it('should update multiple properties at once', () =>
        {
            const initialState = { name: 'John', age: 30, city: 'NYC' };
            const state = new ObservableViewmodelStateBase(initialState);

            state.update({ name: 'Jane', age: 25 });

            expect(state.value).toEqual({ name: 'Jane', age: 25, city: 'NYC' });
        });
    });

    describe('with scheme', () =>
    {
        it('should initialize with valid data', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number().required(),
            }));

            const state = new ObservableViewmodelStateBase(
                { name: 'John', age: 30 },
                scheme,
            );

            expect(state.value).toEqual({ name: 'John', age: 30 });
        });

        it('should throw on invalid initial data', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
            }));

            expect(() => new ObservableViewmodelStateBase(
                { name: 123 } as any,
                scheme,
            )).toThrow(EntityParseException);
        });

        it('should update with valid data', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number().required(),
            }));

            const state = new ObservableViewmodelStateBase(
                { name: 'John', age: 30 },
                scheme,
            );

            state.update({ age: 31 });
            expect(state.value).toEqual({ name: 'John', age: 31 });
        });

        it('should throw on invalid update', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number().required(),
            }));

            const state = new ObservableViewmodelStateBase(
                { name: 'John', age: 30 },
                scheme,
            );

            expect(() => state.update({ age: 'not-a-number' } as any))
                .toThrow(EntityDataUpdateException);
        });
    });
});
