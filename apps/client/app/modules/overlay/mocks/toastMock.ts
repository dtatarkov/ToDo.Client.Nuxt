import { vi } from 'vitest';
import type { Toast, ToastData } from '../entities/toast';
import { Icon } from '@packages/shared';


export function createToastMock(data: Partial<ToastData> = {}): Toast
{
    const defaultData: ToastData = {
        id: '',
        title: '',
        description: '',
        icon: Icon.questionMarkCircle,
        color: 'neutral',
    };

    return {
        ...defaultData,
        ...data,

        key: '',
        close: vi.fn(),
        vnode: {} as VNode,
        getData: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies Toast;
}

export const toastMock = createToastMock();