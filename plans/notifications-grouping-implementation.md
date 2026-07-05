# Notifications Grouping Implementation Plan

## Overview
This plan implements notifications grouping functionality where sibling notifications with the same `groupId` are grouped together in the UI timeline. The implementation uses AppRootNotification (which extends AppNotification) instead of separate Group classes.

---

## Phase 1: Create AppRootNotification Entities

### 1.1 Create `AppRootNotification` abstract class
**File**: `app/modules/notifications/entities/appRootNotification.ts`

```typescript
import type { AppNotification } from './appNotification';

export abstract class AppRootNotification extends AppNotification
{
    abstract readonly children: readonly AppNotification[];

    abstract addNotification(data: AppNotificationData): false | AppNotification;
}
```

### 1.2 Create `AppRootNotificationBase` implementation class
**File**: `app/modules/notifications/entities/appRootNotificationBase.ts`

```typescript
import { AppRootNotification } from './appRootNotification';
import type { AppNotification } from './appNotification';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import { AppNotificationBase } from './appNotificationBase';

export class AppRootNotificationBase extends AppNotificationBase implements AppRootNotification
{
    private readonly childrenInternal: AppNotification[] = [];

    constructor(
        overlay: Overlay,
        data: AppNotificationData,
    )
    {
        super(overlay, data);
    }

    override get children(): readonly AppNotification[]
    {
        return this.childrenInternal;
    }

    addNotification(data: AppNotificationData): false | AppNotification
    {
        // If AppRootNotification groupId is undefined, adding child notification is forbidden
        if (this.groupId === undefined)
        {
            return false;
        }

        // If AppRootNotification groupId is defined, data groupId must match
        if (data.groupId === this.groupId)
        {
            const childNotification = new AppNotificationBase(this.overlay, data);
            this.childrenInternal.push(childNotification);
            return childNotification;
        }

        return false;
    }
}
```

---

## Phase 2: Update AppNotification and AppNotificationBase

### 2.1 Update `appNotification.ts` to include groupId
**File**: `app/modules/notifications/entities/appNotification.ts`

```typescript
import type { Icon } from '@/modules/shared/enums/icons';
import type { NotificationType } from '../types/notificationType';
import type { Color } from '@/modules/uikit/types/color';

export abstract class AppNotification
{
    abstract readonly date: Date;
    abstract readonly title: string;
    abstract readonly description: string;
    abstract readonly icon: Icon;
    abstract readonly type: NotificationType;
    abstract readonly groupId?: string;

    abstract getColor(): Color;
    abstract showToast(): void;
}
```

### 2.2 Update `appNotificationBase.ts` to include groupId
**File**: `app/modules/notifications/entities/appNotificationBase.ts`

```typescript
import { AppNotification } from './appNotification';
import type { AppNotificationData } from '../types/appNotificationData';
import { NotificationType } from '../types/notificationType';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import type { Icon } from '@/modules/shared/enums/icons';
import type { Color } from '@/modules/uikit/types/color';

export class AppNotificationBase extends AppNotification
{
    private readonly colorInternal: Color;

    readonly date: Date;
    readonly title: string;
    readonly description: string;
    readonly icon: Icon;
    readonly type: NotificationType;
    readonly groupId?: string;

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
        this.groupId = data.groupId;
        this.colorInternal = this.calculateColor(data.type);
    }

    getColor(): Color
    {
        return this.colorInternal;
    }

    showToast(): void
    {
        this.overlay.createToast({
            title: this.title,
            description: this.description,
            icon: this.icon,
            color: this.getColor(),
        });
    }

    private calculateColor(type: NotificationType): Color
    {
        switch (type)
        {
            case NotificationType.Error:
                return 'error';
            default:
                return 'neutral';
        }
    }
}
```

---

## Phase 3: Update Notifications Store

### 3.1 Update `appNotificationsStore.ts`
**File**: `app/modules/notifications/entities/appNotificationsStore.ts`

```typescript
import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import type { AppRootNotification } from './appRootNotification';
import type { Timeline } from './timeline';
import type { ObservableReadonly } from '@/modules/shared/entities/observableReadonly';

export abstract class AppNotificationsStore implements Disposable
{
    abstract readonly notifications: ObservableReadonly<readonly AppRootNotification[]>;
    abstract readonly hasNotifications: ObservableReadonly<boolean>;

    abstract addNotification(data: AppNotificationData): AppNotification;

    abstract createTimeline(): Timeline;

    abstract [Symbol.dispose](): void;
}
```

### 3.2 Update `appNotificationsStoreBase.ts`
**File**: `app/modules/notifications/entities/appNotificationsStoreBase.ts`

```typescript
import { dependency } from '@packages/di';
import { AppNotificationsStore } from './appNotificationsStore';
import { AppNotificationBase } from './appNotificationBase';
import { AppRootNotificationBase } from './appRootNotificationBase';
import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from './appNotification';
import type { AppRootNotification } from './appRootNotification';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { Overlay } from '@/modules/overlay/entities/overlay';
import { TimelineBase } from './timelineBase';
import type { Timeline } from './timeline';
import { ObservableArrayBase } from '@/modules/shared/entities/observableArrayBase';
import { ObservableWritableBase } from '@/modules/shared/entities/observableWritableBase';

@dependency(Overlay)
export class AppNotificationsStoreBase extends AppNotificationsStore
{
    private disposeToken = new DisposeToken();

    readonly hasNotifications = new ObservableWritableBase<boolean>(false);

    constructor(private overlay: Overlay)
    {
        super();

        this.disposeToken.onDispose(() =>
        {
            this.notifications[Symbol.dispose]();
            this.hasNotifications[Symbol.dispose]();
        });
    }

    readonly notifications = new ObservableArrayBase<AppRootNotification>();

    override addNotification(data: AppNotificationData): AppNotification | false
    {
        this.disposeToken.assertNotDisposed();

        // Try to add notification to the last root notification
        const lastRoot = this.notifications.value[this.notifications.value.length - 1];
        
        if (lastRoot)
        {
            const result = lastRoot.addNotification(data);
            if (result !== false)
            {
                return result;
            }
        }

        // If not possible, create a new root notification
        const rootNotification = new AppRootNotificationBase(this.overlay, data);
        this.notifications.add(rootNotification);

        // Return the root notification itself
        return rootNotification;
    }

    override createTimeline(): Timeline
    {
        const timeline = new TimelineBase(this);

        return timeline;
    }

    override [Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
```

---

## Phase 4: Update TimelineData and TimelineBase

### 4.1 Update `timelineData.ts`
**File**: `app/modules/notifications/types/timelineData.ts`

```typescript
import type { AppRootNotification } from '../entities/appRootNotification';

export type TimelineData = {
    notifications: readonly AppRootNotification[];
};
```

### 4.2 Update `timelineBase.ts` to pass root notifications directly
**File**: `app/modules/notifications/entities/timelineBase.ts`

```typescript
import { h } from 'vue';
import { Timeline } from './timeline';
import VTimeline from '../components/VTimeline.vue';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { AppNotificationsStore } from './appNotificationsStore';
import type { TimelineData } from '../types/timelineData';

export class TimelineBase extends Timeline
{
    private disposeToken = new DisposeToken();
    private data: TimelineData;

    readonly key = getUniqueId('timeline');

    constructor(
        notificationStore: AppNotificationsStore
    )
    {
        super();

        this.data = shallowReactive({
            notifications: notificationStore.notifications.value,
        });

        notificationStore.notifications.on(notifications =>
        {
            this.data.notifications = [...notifications];
        }, this.disposeToken);
    }

    override get vnode()
    {
        return h(VTimeline, this.data);
    }

    override [Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}
```

---

## Phase 5: Update VTimeline Component

### 5.1 Create `VTimelineIndicator.vue` component
**File**: `app/modules/notifications/components/VTimelineIndicator.vue`

```vue
<template>
  <UIcon :name="props.notification.icon" :class="iconCssClasses" />
</template>

<script setup lang="ts">
import type { AppNotification } from '../entities/appNotification';

const props = defineProps<{
    notification: AppNotification;
}>();

const iconCssClasses = computed(() => {
    const color = props.notification.getColor();
    return `text-${color}`;
});
</script>
```

### 5.2 Create `VTimelineElement.vue` component
**File**: `app/modules/notifications/components/VTimelineElement.vue`

```vue
<template>
  <div class="text-dimmed text-xs/5">{{ formattedDate }}</div>
  <div class="font-medium text-highlighted text-sm">{{ props.notification.title }}</div>
  <div class="text-muted text-wrap text-sm whitespace-pre-wrap">{{ props.notification.description }}</div>
</template>

<script setup lang="ts">
import { DateFormatter } from '@/modules/shared/services/dateFormatter';
import { useService } from '@/modules/shared/composables/useService';
import type { AppNotification } from '../entities/appNotification';

const dateFormatter = useService(DateFormatter);

const props = defineProps<{
    notification: AppNotification;
}>();

const formattedDate = computed(() => dateFormatter.formatDate(props.notification.date));
</script>
```

### 5.3 Update `VTimeline.vue` component
**File**: `app/modules/notifications/components/VTimeline.vue`

```vue
<template>
  <UTimeline :items="props.notifications">
    <template #indicator="{ item }">
      <VTimelineIndicator :notification="item" />
    </template>

    <template #wrapper="{ item }">
      <VTimelineElement :notification="item" />
    </template>
  </UTimeline>
</template>

<script setup lang="ts">
import type { TimelineData } from '@/modules/notifications/types/timelineData';
import VTimelineIndicator from './VTimelineIndicator.vue';
import VTimelineElement from './VTimelineElement.vue';

const props = defineProps<TimelineData>();
</script>
```

---

## Phase 6: Update Mocks

### 6.1 Create `appRootNotificationMock.ts`
**File**: `app/modules/notifications/mocks/appRootNotificationMock.ts`

```typescript
import { vi } from 'vitest';
import type { AppRootNotification } from '../entities/appRootNotification';
import type { AppNotificationData } from '../types/appNotificationData';
import type { AppNotification } from '../entities/appNotification';
import { Icon } from '@/modules/shared/enums/icons';
import { NotificationType } from '../types/notificationType';

export function createAppRootNotificationMock(
    data: AppNotificationData,
    children: readonly AppNotification[] = [],
): AppRootNotification
{
    return {
        ...data,
        children,
        addNotification: vi.fn(),
        getColor: vi.fn(),
        showToast: vi.fn(),
    } satisfies AppRootNotification;
}

export const appRootNotificationMock = createAppRootNotificationMock({
    date: new Date(),
    title: 'Test Root Notification',
    description: 'Test Root Notification Description',
    icon: Icon.bellInactive,
    type: NotificationType.Error,
    groupId: 'group-1',
});
```

---

## Phase 7: Create Unit Tests

### 7.1 Create `appRootNotificationBase.test.ts`
**File**: `app/modules/notifications/test/nuxt/appRootNotificationBase.test.ts`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppRootNotificationBase } from '../../entities/appRootNotificationBase';
import { Icon } from '@/modules/shared/enums/icons';
import { NotificationType } from '../../types/notificationType';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';
import type { AppNotificationData } from '../../types/appNotificationData';
import type { AppNotification } from '../../entities/appNotification';

class AppRootNotificationBaseTestingSuite
{
    private data: AppNotificationData;
    private root: AppRootNotificationBase;

    constructor()
    {
        this.data = {
            date: new Date('2024-01-01'),
            title: 'Test Title',
            description: 'Test Description',
            icon: Icon.bellInactive,
            type: NotificationType.Error,
            groupId: 'group-1',
        };

        this.root = new AppRootNotificationBase(overlayMock, this.data);
    }

    getChildNotificationData(index: number): AppNotificationData | undefined
    {
        const child = this.root.children[index];

        if (child === undefined)
        {
            return undefined;
        }

        return {
            date: child.date,
            title: child.title,
            description: child.description,
            icon: child.icon,
            type: child.type,
            groupId: child.groupId,
        };
    }

    addNotification(dataOverrides?: Partial<AppNotificationData>): AppNotification
    {
        const childData: AppNotificationData = {
            ...this.data,
            ...dataOverrides,
        };

        const notification = this.root.addNotification(childData);

        if (notification === false)
        {
            throw new Error('Failed to add notification - addNotification returned false');
        }

        return notification;
    }

    assertNotificationMatchesData(notification: AppNotification, data: AppNotificationData): this
    {
        expect(notification.title).toBe(data.title);
        expect(notification.description).toBe(data.description);
        expect(notification.icon).toBe(data.icon);
        expect(notification.date).toEqual(data.date);
        expect(notification.type).toBe(data.type);
        expect(notification.groupId).toBe(data.groupId);

        return this;
    }

    assertRootNotificationMatchesData(data: AppNotificationData): this
    {
        this.assertNotificationMatchesData(this.root, data);
        return this;
    }

    assertChildrenCount(expected: number): this
    {
        expect(this.root.children.length).toBe(expected);

        return this;
    }

    assertAddNotificationReturnsFalse(dataOverrides?: Partial<AppNotificationData>): this
    {
        const childData: AppNotificationData = {
            ...this.data,
            ...dataOverrides,
        };

        const result = this.root.addNotification(childData);

        expect(result).toBe(false);

        return this;
    }

    assertColor(color: string): void
    {
        expect(this.root.getColor()).toBe(color);
    }
}

describe('AppRootNotificationBase', () =>
{
    const suite = new AppRootNotificationBaseTestingSuite();

    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('properties', () =>
    {
        it('should create root notification with provided data', () =>
        {
            suite.assertRootNotificationMatchesData(suite['data']);
        });

        it('should have empty children by default', () =>
        {
            suite.assertChildrenCount(0);
        });
    });

    describe('addNotification', () =>
    {
        it('should add notification with matching groupId and return child notification', () =>
        {
            const childData: AppNotificationData = {
                ...suite['data'],
                title: 'Child Title',
            };

            const notification = suite.addNotification({ title: 'Child Title' });

            suite
                .assertChildrenCount(1)
                .assertNotificationMatchesData(notification, childData);
        });

        it('should not add notification when root groupId is undefined', () => {
            const undefinedData: AppNotificationData = {
                ...suite['data'],
                groupId: undefined,
                title: 'Ungrouped Title',
            };

            const root = new AppRootNotificationBase(overlayMock, undefinedData);

            const childData: AppNotificationData = {
                ...undefinedData,
                title: 'Child Title',
                groupId: undefined,
            };

            const result = root.addNotification(childData);

            expect(result).toBe(false);
            expect(root.children.length).toBe(0);
        });

        it('should not add notification with different groupId', () =>
        {
            suite
                .assertAddNotificationReturnsFalse({ groupId: 'different-group' })
                .assertChildrenCount(0);
        });

        it('should not add notification with undefined groupId when root has groupId', () =>
        {
            suite
                .assertAddNotificationReturnsFalse({ groupId: undefined })
                .assertChildrenCount(0);
        });
    });

    describe('getColor', () =>
    {
        it('should return error color for Error notification type', () =>
        {
            suite.assertColor('error');
        });
    });
});
```

### 7.2 Update `notificationsStoreBase.test.ts` to test grouping
**File**: `app/modules/notifications/test/nuxt/notificationsStoreBase.test.ts`

Add test cases for grouping functionality. The existing `addNotification` method should be extended to accept partial data overrides, and new helper methods should be added:

```typescript
// Add these methods to the existing NotificationsStoreBaseTestingSuite class:

addNotification(dataOverrides?: Partial<AppNotificationData>): this
{
    this.notificationIndex++;

    const data: AppNotificationData = {
        ...this.createNotificationData(),
        ...dataOverrides,
    };

    const notification = this.store.addNotification(data);

    this.notificationsData.set(notification, data);
    this.notificationsAdded.push(notification);

    return this;
}

getNotifications(): readonly AppRootNotification[]
{
    return this.store.notifications.value;
}

assertNotificationsCount(expected: number): this
{
    expect(this.getNotifications().length).toBe(expected);

    return this;
}

assertRootNotificationHasChildrenCount(rootIndex: number, expected: number): this
{
    expect(this.getNotifications()[rootIndex].children.length).toBe(expected);

    return this;
}

assertRootNotificationGroupId(rootIndex: number, expected: string | undefined): this
{
    expect(this.getNotifications()[rootIndex].groupId).toBe(expected);

    return this;
}
```

Add these test cases inside the existing `describe('NotificationsStoreBase')` block:

```typescript
describe('addNotification with groupId', () =>
{
    it('should create root notification when notification has groupId', () =>
    {
        suite
            .addNotification({ groupId: 'group-1' })
            .assertNotificationsCount(1)
            .assertRootNotificationGroupId(0, 'group-1');
    });

    it('should add multiple notifications with same groupId to same root notification', () =>
    {
        suite
            .addNotification({ groupId: 'group-1', title: 'First Notification' })
            .addNotification({ groupId: 'group-1', title: 'Second Notification' })
            .assertNotificationsCount(1)
            .assertRootNotificationHasChildrenCount(0, 2);
    });

    it('should create separate root notifications for different groupIds', () =>
    {
        suite
            .addNotification({ groupId: 'group-1' })
            .addNotification({ groupId: 'group-2' })
            .assertNotificationsCount(2);
    });

    it('should return child notification when groupId is provided', () =>
    {
        suite
            .addNotification({ groupId: 'group-1' })
            .assertNotificationsCount(1);
    });
});
```

---

## Phase 8: Create Storybook Stories

### 8.1 Create `VTimeline.stories.ts`
**File**: `app/modules/notifications/stories/VTimeline.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import VTimeline from '../components/VTimeline.vue';
import type { TimelineData } from '../types/timelineData';
import { AppRootNotificationBase } from '../entities/appRootNotificationBase';
import { AppNotificationBase } from '../entities/appNotificationBase';
import { Icon } from '@/modules/shared/enums/icons';
import { NotificationType } from '../types/notificationType';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';

const meta = {
    title: 'Notifications/VTimeline',
    component: VTimeline,
    args: {
        notifications: [],
    },
} satisfies Meta<typeof VTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single notification story
export const Single: Story = {
    args: {
        notifications: [
            createAppRootNotification({
                date: new Date(),
                title: 'Single Error Notification',
                description: 'This is a single error notification without grouping.',
                icon: Icon.alert,
                type: NotificationType.Error,
                groupId: 'single-error',
            }),
        ],
    },
};

// Multiple notifications in group story
export const Multiple: Story = {
    args: {
        notifications: [
            createAppRootNotification({
                date: new Date(),
                title: 'Error Group',
                description: 'Multiple errors occurred',
                icon: Icon.alert,
                type: NotificationType.Error,
                groupId: 'error-group',
            }, [
                {
                    date: new Date(),
                    title: 'First Error',
                    description: 'First error description',
                    icon: Icon.alert,
                    type: NotificationType.Error,
                    groupId: 'error-group',
                },
                {
                    date: new Date(),
                    title: 'Second Error',
                    description: 'Second error description',
                    icon: Icon.alert,
                    type: NotificationType.Error,
                    groupId: 'error-group',
                },
                {
                    date: new Date(),
                    title: 'Third Error',
                    description: 'Third error description',
                    icon: Icon.alert,
                    type: NotificationType.Error,
                    groupId: 'error-group',
                },
            ]),
        ],
    },
};

function createAppRootNotification(
    data: { groupId?: string } & Omit<AppNotificationData, 'groupId'>,
    childrenData: Array<{ groupId?: string } & Omit<AppNotificationData, 'groupId'> = []
): AppRootNotificationBase
{
    const root = new AppRootNotificationBase(overlayMock, data);
    childrenData.forEach(childData => {
        root.addNotification(childData);
    });
    return root;
}
```

---

## Implementation Order

1. **Phase 1**: Create `AppRootNotification` and `AppRootNotificationBase` classes
2. **Phase 2**: Update `AppNotification` and `AppNotificationBase` to include `groupId`
3. **Phase 3**: Update `AppNotificationsStore` and `AppNotificationsStoreBase` for grouping
4. **Phase 4**: Update `TimelineData` and `TimelineBase` to use root notifications
5. **Phase 5**: Create `VTimelineIndicator` and `VTimelineElement` components, update `VTimeline`
6. **Phase 6**: Create app root notification mocks
7. **Phase 7**: Write unit tests for new functionality
8. **Phase 8**: Create Storybook stories

---

## Testing Checklist

- [ ] AppRootNotificationBase instantiation with correct data
- [ ] groupId property is correctly stored and accessible
- [ ] Adding notifications with matching groupId returns true
- [ ] Adding notification with undefined groupId to root with undefined groupId returns false (forbidden)
- [ ] Adding notifications with different groupId returns false
- [ ] Adding notification with undefined groupId when root has groupId returns false
- [ ] getColor works correctly on AppRootNotificationBase
- [ ] Store creates root notifications for notifications with groupId
- [ ] Store adds multiple notifications to same root notification
- [ ] Store creates separate root notifications for different groupIds
- [ ] VTimeline renders root notifications correctly
- [ ] Storybook stories display correctly

---

## Notes

- AppRootNotification extends AppNotificationBase and adds children collection
- The addNotification method returns boolean to indicate success/failure
- Grouping logic is encapsulated inside AppRootNotification
- TimelineData type changed from AppNotification[] to AppRootNotification[]
- VTimeline uses VTimelineIndicator and VTimelineElement components that accept AppNotification in props
- AppNotificationsStoreBase.addNotification first tries to add to last root, if not possible creates new root
- When root notification groupId is undefined, adding child notification is forbidden and returns false
- When root and notification groupIds match, notification is added to root
