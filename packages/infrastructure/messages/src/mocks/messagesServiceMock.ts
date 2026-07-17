import type { MessagesService } from '../services/messagesService';
import { vi } from 'vitest';

export const messagesServiceMock = {
    getMessage: vi.fn(),
} satisfies MessagesService;