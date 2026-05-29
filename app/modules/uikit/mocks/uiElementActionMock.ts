import { UIElementActionState, type UIElementAction } from '../entities/uiElementAction';
import { vi } from 'vitest';

export const uiElementActionMock = {
    actionState: UIElementActionState.idle,
    executeAsync: vi.fn(),
    setActionStateChangeHandler: vi.fn(),
} satisfies UIElementAction;