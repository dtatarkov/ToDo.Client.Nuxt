import type { Notification } from './notification';
import { OverlayElementsStore } from './overlayElementsStore';

export abstract class NotificationsStore extends OverlayElementsStore<Notification>
{
}