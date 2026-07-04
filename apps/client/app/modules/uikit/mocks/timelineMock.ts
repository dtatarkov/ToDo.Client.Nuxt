import type { Timeline } from '@/modules/notifications/entities/timeline';
import { vi } from 'vitest';

export const timelineMock = {
    key: '',
    vnode: {} as VNode,
    [Symbol.dispose]: vi.fn(),
} satisfies Timeline;