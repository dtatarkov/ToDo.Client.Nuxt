# Refactoring Plan: NotificationsStore Construction

## Overview

Create new `NotificationData`, `Notification`, `NotificationBase`, `NotificationsStore`, and `NotificationsStoreBase` in the `notifications` module. Register `NotificationsStore` in DI.

---

## Step 1: Create NotificationData type

**New file:** [`app/modules/notifications/types/notificationData.ts`](app/modules/notifications/types/notificationData.ts)

```typescript
import type { Icon } from '@packages/shared';

export type NotificationData = {
    date: Date;
    title: string;
    description: string;
    icon: Icon;
};
```

---

## Step 2: Create Notification + NotificationBase

**New file:** [`app/modules/notifications/entities/notification.ts`](app/modules/notifications/entities/notification.ts)

`Notification` directly exposes all fields from `NotificationData` as properties (no `data` wrapper), and has `showToast` which calls `overlay.createNotification()` with `color: 'error'`.

```typescript
import type { Icon } from '@packages/shared';
import type { Overlay } from '@/modules/overlay/entities/overlay';

export abstract class Notification
{
    abstract readonly date: Date;
    abstract readonly title: string;
    abstract readonly description: string;
    abstract readonly icon: Icon;

    abstract showToast(): void;
}
```

**New file:** [`app/modules/notifications/entities/notificationBase.ts`](app/modules/notifications/entities/notificationBase.ts)

```typescript
import type { Notification } from './notification';
import type { NotificationData } from '../types/notificationData';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import type { Icon } from '@packages/shared';

export class NotificationBase extends Notification
{
    readonly date: Date;
    readonly title: string;
    readonly description: string;
    readonly icon: Icon;

    constructor(
        data: NotificationData,
        private overlay: Overlay,
    )
    {
        super();

        this.date = data.date;
        this.title = data.title;
        this.description = data.description;
        this.icon = data.icon;
    }

    showToast(): void
    {
        this.overlay.createNotification({
            title: this.title,
            description: this.description,
            icon: this.icon,
            color: 'error',
        });
    }
}
```

---

## Step 3: Create NotificationsStore + NotificationsStoreBase

**New file:** [`app/modules/notifications/entities/notificationsStore.ts`](app/modules/notifications/entities/notificationsStore.ts)

```typescript
import type { NotificationData } from '../types/notificationData';
import type { Notification } from './notification';
import type { DisposeToken } from '@packages/shared';
import type { Action } from '@packages/shared';

export abstract class NotificationsStore implements Disposable
{
    abstract addNotification(data: NotificationData): void;
    abstract getNotifications(): Notification[];
    abstract onNotificationAdded(callback: Action<[Notification]>, disposeToken?: DisposeToken): void;
    abstract [Symbol.dispose](): void;
}
```

**New file:** [`app/modules/notifications/entities/notificationsStoreBase.ts`](app/modules/notifications/entities/notificationsStoreBase.ts)

```typescript
import { dependency } from '@packages/di';
import { NotificationsStore } from './notificationsStore';
import { NotificationBase } from './notificationBase';
import type { NotificationData } from '../types/notificationData';
import type { Notification } from './notification';
import { EntityEvent } from '@packages/shared';
import type { DisposeToken } from '@packages/shared';
import type { Action } from '@packages/shared';
import { Overlay } from '@/modules/overlay/entities/overlay';

@dependency(Overlay)
export class NotificationsStoreBase extends NotificationsStore
{
    private notifications: Notification[] = [];
    private notificationAddedEvent = new EntityEvent<Notification>();

    constructor(private overlay: Overlay)
    {
        super();
    }

    addNotification(data: NotificationData): void
    {
        const notification = new NotificationBase(data, this.overlay);
        this.notifications.push(notification);
        this.notificationAddedEvent.emit(notification);
    }

    getNotifications(): Notification[]
    {
        return this.notifications;
    }

    onNotificationAdded(callback: Action<[Notification]>, disposeToken?: DisposeToken): void
    {
        this.notificationAddedEvent.on(callback, disposeToken);
    }

    [Symbol.dispose](): void
    {
        this.notificationAddedEvent[Symbol.dispose]();
    }
}
```

---

## Step 4: Register NotificationsStore in DI

**Modify file:** [`app/modules/notifications/composables/useNotificationsServices.ts`](app/modules/notifications/composables/useNotificationsServices.ts)

Replace `Notifier` registration with `NotificationsStore` registration:

```typescript
import { useServiceRegistration } from '@packages/shared';
import { NotificationsStore } from '../entities/notificationsStore';
import { NotificationsStoreBase } from '../entities/notificationsStoreBase';

export function useNotificationsServices(): void
{
    useServiceRegistration(NotificationsStore).to(NotificationsStoreBase).asSingleton();
}
```

---

## Step 5: Add tests

**New file:** [`app/modules/notifications/test/nuxt/notificationsStoreBase.test.ts`](app/modules/notifications/test/nuxt/notificationsStoreBase.test.ts)

Tests:
- `addNotification` creates NotificationBase and adds to list
- `addNotification` emits onNotificationAdded event
- `getNotifications` returns all added notifications
- `[Symbol.dispose]` cleans up event

**New file:** [`app/modules/notifications/test/nuxt/notificationBase.test.ts`](app/modules/notifications/test/nuxt/notificationBase.test.ts)

Tests:
- `date`/`title`/`description`/`icon` properties return values from constructor data
- `showToast` calls `overlay.createNotification` with correct params including `color: 'error'`

---

## Summary

| Action | File |
|--------|------|
| Create | `app/modules/notifications/types/notificationData.ts` |
| Create | `app/modules/notifications/entities/notification.ts` |
| Create | `app/modules/notifications/entities/notificationBase.ts` |
| Create | `app/modules/notifications/entities/notificationsStore.ts` |
| Create | `app/modules/notifications/entities/notificationsStoreBase.ts` |
| Modify | `app/modules/notifications/composables/useNotificationsServices.ts` |
| Create | `app/modules/notifications/test/nuxt/notificationsStoreBase.test.ts` |
| Create | `app/modules/notifications/test/nuxt/notificationBase.test.ts` |