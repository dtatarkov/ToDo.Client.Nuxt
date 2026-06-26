import type { Timeline } from '@/modules/notifications/entities/timeline';
import { vi } from 'vitest';

export const timelineMock = {
    key: '',
    vnode: {} as VNode,
    isEmpty: false,
    onEmptyStateChange: vi.fn(),
    [Symbol.dispose]: vi.fn(),
} satisfies Timeline;