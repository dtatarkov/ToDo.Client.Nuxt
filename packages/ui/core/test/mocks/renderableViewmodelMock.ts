import { vi } from 'vitest';
import type { RenderableViewmodel } from '../../src/viewmodels/renderableViewmodel';
import { createObservableViewmodelStateMock } from './observableViewmodelStateMock';

const renderKey = Symbol('test-render-key');

export function createRenderableViewmodelMock<TData extends Record<string, any> = Record<string, any>>(
    data: TData = {} as TData,
)
{
    return {
        get renderKey(): symbol { return renderKey; },
        state: createObservableViewmodelStateMock(data),
        [Symbol.dispose]: vi.fn(),
    } satisfies RenderableViewmodel<TData>;
}

export const renderableViewmodelMock = createRenderableViewmodelMock({});
