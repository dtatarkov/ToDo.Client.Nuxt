import { vi } from 'vitest';
import type { ButtonGeneralViewmodel } from '../interfaces/buttonGeneralViewmodel';

export const buttonGeneralViewmodelMock = {
    key: '',
    title: '',
    color: 'neutral',
    isDisabled: false,
    isLoading: false,

    component: {
        setup: vi.fn(),
    },

    setClickHandler: vi.fn(),
    applyHandlers: vi.fn(),
} satisfies ButtonGeneralViewmodel;