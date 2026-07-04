import { vi } from 'vitest';
import type { MessagesService } from '../services/messagesService';

export const messagesServiceMock = {
    getMessage: vi.fn(),
} satisfies MessagesService;