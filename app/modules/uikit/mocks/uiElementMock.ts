import { vi } from 'vitest';
import type { UIElement } from '../entities/uiElement';

export const uiElementMock =
    {
        key: '',
        vnode: {} as VNode,
        [Symbol.dispose]: vi.fn(),
    } satisfies UIElement;