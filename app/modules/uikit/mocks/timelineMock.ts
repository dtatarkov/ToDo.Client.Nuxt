import type { Timeline } from '@/modules/notifications/entities/timeline';
import { vi } from 'vitest';

export const timelineMock = {
    key: '',
    vnode: {} as VNode,
    addNotification: vi.fn(),
    getNotifications: vi.fn(),
    hasNotifications: vi.fn(),
    onNotificationsChange: vi.fn(),
    [Symbol.dispose]: vi.fn(),
} satisfies Timeline;