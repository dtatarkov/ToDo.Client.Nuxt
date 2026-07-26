import { describe, it, expect } from 'vitest';
import { ObservableViewmodelStateBase } from '../../src/entities/observableViewmodelStateBase';

describe('ObservableViewmodelStateBase', () =>
{
    describe('update', () =>
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
});
