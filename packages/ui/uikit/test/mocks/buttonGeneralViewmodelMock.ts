import type { ButtonGeneralViewmodel } from '@client/ui-uikit';
import { vi } from 'vitest';
import { createObservableViewmodelStateMock } from '@client/ui-core/mocks';

export function createButtonGeneralViewmodelMock()
{
    return {
        setColor: vi.fn(),
        setTitle: vi.fn(),
        getCommand: vi.fn(),
        setCommand: vi.fn(),
        onClick: vi.fn(),
        click: vi.fn(),
        disable: vi.fn(),
        enable: vi.fn(),
        showLoader: vi.fn(),
        hideLoader: vi.fn(),

        state: createObservableViewmodelStateMock({
            titleKey: undefined,
            color: 'neutral',
            isDisabled: false,
            isLoading: false,
        }),

        [Symbol.dispose]: vi.fn(),
    } satisfies ButtonGeneralViewmodel;
}

export const buttonGeneralViewmodelMock = createButtonGeneralViewmodelMock();
