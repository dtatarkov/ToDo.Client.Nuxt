import { vi } from 'vitest';
import type { NotificationsTimeline } from '../entities/notificationsTimeline';

export const notificationsTimelineMock = {
    key: '',
    vnode: {} as VNode,
    addRecord: vi.fn(),
    getRecords: vi.fn(),
    hasRecords: vi.fn(),
    onRecordsChange: vi.fn(),
    [Symbol.dispose]: vi.fn(),
} satisfies NotificationsTimeline;