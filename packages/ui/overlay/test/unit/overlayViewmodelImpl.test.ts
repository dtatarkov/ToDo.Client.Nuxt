import { describe, it, expect } from 'vitest';
import { OverlayViewmodelImpl } from '../../src/viewmodels/overlayViewmodelImpl';
import { overlayMock } from '../mocks/overlayMock';
import type { Action } from '@client/shared';
import { createOverlayElementViewmodelMock } from '../mocks/overlayElementViewmodelMock';

function setupViewModel()
{
    const overlayViewmodel = new OverlayViewmodelImpl(overlayMock);

    return { overlayViewmodel };
}

describe('OverlayViewmodelImpl', () =>
{
    describe('state', () =>
    {
        it('should have empty elements array initially', () =>
        {
            const { overlayViewmodel } = setupViewModel();

            expect(overlayViewmodel.state.value.elements).toHaveLength(0);
        });

        it('should update state when overlay elements change', () =>
        {
            const callbacks = new Array<Action>();

            overlayMock.elements.on.mockImplementation(fn =>
            {
                callbacks.push(fn);
            });

            const { overlayViewmodel } = setupViewModel();

            overlayMock.elements.setMockValue([
                createOverlayElementViewmodelMock(),
            ]);

            callbacks.forEach(fn =>
            {
                fn();
            });

            expect(overlayViewmodel.state.value.elements).toHaveLength(1);
        });
    });
});
