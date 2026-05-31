import { vi } from 'vitest';
import type { ButtonGeneral } from '../entities/buttons/buttonGeneral';

export const buttonGeneralMock = {
    key: '',
    title: '',
    color: 'neutral',
    isDisabled: false,
    isLoading: false,

    component: {
        setup: vi.fn(),
    },

    setClickHandler: vi.fn(),
} satisfies ButtonGeneral;