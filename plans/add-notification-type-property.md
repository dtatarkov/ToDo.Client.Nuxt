# Add `type` Property to Notification

## Overview

Add a `type` property to the notification system to distinguish different types of notifications (starting with `error`). This type will be used to determine the toast color displayed in the UI.

## Changes Summary

### 1. Create `NotificationType` Enum

**File:** `app/modules/notifications/types/notificationType.ts` (new)

```typescript
export enum NotificationType
{
    Error = 1,
}
```

- Numeric enum starting from `1` (as specified).
- Currently only `Error = 1`.

### 2. Update `AppNotificationData` Type

**File:** `app/modules/notifications/types/appNotificationData.ts`

Add `type` field:

```typescript
import type { Icon } from '@/modules/shared/enums/icons';
import type { NotificationType } from './notificationType';

export type AppNotificationData = {
    groupId?: string;
    date: Date;
    title: string;
    description: string;
    icon: Icon;
    type: NotificationType;
};
```

### 3. Update `AppNotification` Abstract Class

**File:** `app/modules/notifications/entities/appNotification.ts`

Add abstract `type` property:

```typescript
import type { Icon } from '@/modules/shared/enums/icons';
import type { NotificationType } from '../types/notificationType';

export abstract class AppNotification
{
    abstract readonly date: Date;
    abstract readonly title: string;
    abstract readonly description: string;
    abstract readonly icon: Icon;
    abstract readonly type: NotificationType;

    abstract showToast(): void;
}
```

### 4. Update `AppNotificationBase` Class

**File:** `app/modules/notifications/entities/appNotificationBase.ts`

- Add `type` property (set from `data.type`)
- Add private `getToastColor()` method that returns `Color` based on `type`
- Update `showToast()` to use `getToastColor()` instead of hardcoded `'error'`

```typescript
import { AppNotification } from './appNotification';
import type { AppNotificationData } from '../types/appNotificationData';
import type { NotificationType } from '../types/notificationType';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import type { Icon } from '@/modules/shared/enums/icons';
import type { Color } from '@/modules/uikit/types/color';

export class AppNotificationBase extends AppNotification
{
    readonly date: Date;
    readonly title: string;
    readonly description: string;
    readonly icon: Icon;
    readonly type: NotificationType;

    constructor(
        private overlay: Overlay,
        data: AppNotificationData,
    )
    {
        super();

        this.date = data.date;
        this.title = data.title;
        this.description = data.description;
        this.icon = data.icon;
        this.type = data.type;
    }

    private getToastColor(): Color
    {
        switch (this.type)
        {
            case NotificationType.Error:
                return 'error';
            default:
                return 'neutral';
        }
    }

    showToast(): void
    {
        this.overlay.createToast({
            title: this.title,
            description: this.description,
            icon: this.icon,
            color: this.getToastColor(),
        });
    }
}
```

### 5. Update `appNotificationMock.ts`

**File:** `app/modules/notifications/mocks/appNotificationMock.ts`

Add `type` to the mock data:

```typescript
import { vi } from 'vitest';
import type { AppNotification } from '../entities/appNotification';
import type { AppNotificationData } from '../types/appNotificationData';
import { Icon } from '@/modules/shared/enums/icons';
import { NotificationType } from '../types/notificationType';

export function createAppNotificationMock(data: AppNotificationData)
{
    return {
        ...data,

        showToast: vi.fn()
    } satisfies AppNotification;
}

export const appNotificationMock = createAppNotificationMock({
    date: new Date(),
    title: 'Test',
    description: 'Description',
    icon: Icon.bellInactive,
    type: NotificationType.Error,
});
```

### 6. Update `notificationBase.test.ts`

**File:** `app/modules/notifications/test/nuxt/notificationBase.test.ts`

- Add `type` to test data
- Add assertion for `type` in `assertNotificationFieldsMatchData()`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppNotificationBase } from '../../entities/appNotificationBase';
import { Icon } from '@/modules/shared/enums/icons';
import { NotificationType } from '../../types/notificationType';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';
import type { AppNotificationData } from '../../types/appNotificationData';

class NotificationBaseTestingSuite
{
    private data: AppNotificationData;
    private notification: AppNotificationBase;

    constructor()
    {
        this.data = {
            date: new Date('2024-01-01'),
            title: 'Test Title',
            description: 'Test Description',
            icon: Icon.exclamationTriangle,
            type: NotificationType.Error,
        };

        this.notification = new AppNotificationBase(overlayMock, this.data);
    }

    createToast()
    {
        this.notification.showToast();

        return this;
    }

    assertNotificationFieldsMatchData()
    {
        expect(this.notification.date).toEqual(this.data.date);
        expect(this.notification.title).toBe(this.data.title);
        expect(this.notification.description).toBe(this.data.description);
        expect(this.notification.icon).toBe(this.data.icon);
        expect(this.notification.type).toBe(this.data.type);

        return this;
    }

    assertToastCreated()
    {
        expect(overlayMock.createToast).toHaveBeenCalledTimes(1);

        return this;
    }

    assertToastDataMatchesNotificationData()
    {
        expect(overlayMock.createToast).toHaveBeenCalledWith({
            title: this.data.title,
            description: this.data.description,
            icon: this.data.icon,
            color: 'error',
        });

        return this;
    }
}

describe('NotificationBase', () =>
{
    const suite = new NotificationBaseTestingSuite();

    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('properties', () =>
    {
        it('notification properties match provided data', () =>
        {
            suite.assertNotificationFieldsMatchData();
        });
    });

    describe('showToast', () =>
    {
        it('should call overlay.createToast with correct params', () =>
        {
            suite
                .createToast()
                .assertToastCreated()
                .assertToastDataMatchesNotificationData();
        });
    });
});
```

### 7. Update `notificationsStoreBase.test.ts`

**File:** `app/modules/notifications/test/nuxt/notificationsStoreBase.test.ts`

- Add `type` to `createNotificationData()`
- Add `type` assertion in `assertNotificationMatchesData()`

```typescript
import { NotificationType } from '../../types/notificationType';

// In createNotificationData():
private createNotificationData(): AppNotificationData
{
    const data: AppNotificationData = {
        date: new Date(),
        title: `Test Title ${this.notificationIndex}`,
        description: `Test Description ${this.notificationIndex}`,
        icon: Icon.bellInactive,
        type: NotificationType.Error,
    };

    return data;
}

// In assertNotificationMatchesData():
private assertNotificationMatchesData(notification: AppNotification, data: AppNotificationData): void
{
    expect(notification.title).toBe(data.title);
    expect(notification.description).toBe(data.description);
    expect(notification.icon).toBe(data.icon);
    expect(notification.date).toEqual(data.date);
    expect(notification.type).toBe(data.type);
}
```

### 8. Update `ToDoStateNew` and `ToDoStateSaved`

**File:** `app/modules/todo/entities/todoStateNew.ts`
**File:** `app/modules/todo/entities/todoStateSaved.ts`

Add `type: NotificationType.Error` to the `addNotification` calls, and remove the commented-out `//color: 'error'` lines.

```typescript
import { NotificationType } from '@/modules/notifications/types/notificationType';

// In the addNotification call:
this.notificationsStore.addNotification({
    groupId: 'todo-create-error',
    date: new Date(),
    title: this.messagesService.getMessage('todo.notification.createError.title'),
    description: error.toString(),
    icon: Icon.exclamationTriangle,
    type: NotificationType.Error,
});
```

## Files Modified

| # | File | Action |
|---|------|--------|
| 1 | `app/modules/notifications/types/notificationType.ts` | **Create** |
| 2 | `app/modules/notifications/types/appNotificationData.ts` | Edit - add `type` |
| 3 | `app/modules/notifications/entities/appNotification.ts` | Edit - add abstract `type` |
| 4 | `app/modules/notifications/entities/appNotificationBase.ts` | Edit - add `type`, `getToastColor()`, update `showToast()` |
| 5 | `app/modules/notifications/mocks/appNotificationMock.ts` | Edit - add `type` |
| 6 | `app/modules/notifications/test/nuxt/notificationBase.test.ts` | Edit - add type assertions |
| 7 | `app/modules/notifications/test/nuxt/notificationsStoreBase.test.ts` | Edit - add type assertions |
| 8 | `app/modules/todo/entities/todoStateNew.ts` | Edit - add `type` |
| 9 | `app/modules/todo/entities/todoStateSaved.ts` | Edit - add `type` |

## Data Flow

```
AppNotificationData (data layer)
  └─ type: NotificationType.Error
       │
       ▼
AppNotificationBase (entity)
  ├─ readonly type: NotificationType  ← stored from data
  └─ getToastColor(): Color           ← maps type → color
       │
       ▼
showToast()
  └─ overlay.createToast({ color: this.getToastColor() })
```

## Mermaid Diagram

```mermaid
flowchart LR
    A[AppNotificationData] -->|type| B[AppNotificationBase]
    B --> C[getToastColor]
    C -->|NotificationType.Error| D[color: error]
    B --> E[showToast]
    E --> F[overlay.createToast]
    F --> G[Toast with color from type]