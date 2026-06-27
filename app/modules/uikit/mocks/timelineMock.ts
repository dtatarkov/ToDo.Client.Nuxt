import type { Timeline } from '@/modules/notifications/entities/timeline';
import { vi } from 'vitest';
import { createObservableReadonlyMock } from '@/modules/shared/mocks/observableReadonlyMock';

export const timelineMock = {
    key: '',
    vnode: {} as VNode,
    isEmpty: createObservableReadonlyMock(false),
    [Symbol.dispose]: vi.fn(),
} satisfies Timeline;