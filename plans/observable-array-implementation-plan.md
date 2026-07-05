# ObservableArray Implementation Plan

## Overview

Create a reusable `ObservableArray<T>` class based on the existing `ObservableWritable<T>` pattern, then refactor `AppNotificationsStore` to use it instead of the manual `getNotifications()` / `onNotificationsChange()` pattern.

## Current Architecture

### ObservableWritable<T> (existing)
- **Interface**: [`app/modules/shared/entities/observableWritable.ts`](../app/modules/shared/entities/observableWritable.ts) — defines `value: T` + `on(handler)` from `Subscribable<T>`
- **Base class**: [`app/modules/shared/entities/observableWritableBase.ts`](../app/modules/shared/entities/observableWritableBase.ts) — stores `valueInternal`, emits via `EntityEvent` on set. The setter has a `!==` check that skips emit when the same reference is assigned. Accepts `ObservableWritableConfiguration` with `deferred?: boolean`.

### Current AppNotificationsStore pattern
- **Interface**: [`app/modules/notifications/entities/appNotificationsStore.ts`](../app/modules/notifications/entities/appNotificationsStore.ts) — has `getNotifications(): AppNotification[]` + `onNotificationsChange(callback)` + `isEmpty: ObservableReadonly<boolean>`
- **Base**: [`app/modules/notifications/entities/appNotificationsStoreBase.ts`](../app/modules/notifications/entities/appNotificationsStoreBase.ts) — manually manages `notifications: AppNotification[]` array + `notificationsChangeEvent: EntityEvent<AppNotification[]>` + `isEmpty: ObservableWritableBase<boolean>`
- **Consumer**: [`app/modules/notifications/entities/timelineBase.ts`](../app/modules/notifications/entities/timelineBase.ts) — uses `customRef` wrapping `getNotifications()` + `onNotificationsChange()`

## Proposed Design

### Modification: Add `notifySubscribers` to `ObservableWritableBase`

Add a `protected` method that directly emits the current value without the reference check:

```typescript
protected notifySubscribers(): void
{
    this.event.emit(this.valueInternal);
}
```

This allows subclasses like `ObservableArrayBase` to mutate the internal value in-place and then notify subscribers.

### New: ObservableArray<T> interface
Extends `ObservableWritable<T[]>` with array-specific mutation methods:

```typescript
export interface ObservableArray<T> extends ObservableWritable<T[]>
{
    add(element: T): void;
    remove(element: T): boolean;
}
```

### New: ObservableArrayBase<T> class
Extends `ObservableWritableBase<T[]>` adding array mutation. Uses `deferred: true` configuration so that multiple mutations within one microtask cycle produce a single notification:

```typescript
export class ObservableArrayBase<T> extends ObservableWritableBase<T[]>
{
    constructor(defaultValue: T[] = [])
    {
        super([...defaultValue], { deferred: true }); // defensive copy + deferred emit
    }

    add(element: T): void;       // this.value.push(element) + notifySubscribers()
    remove(element: T): boolean; // removeFromArray(this.value, element) + notifySubscribers()
}
```

Key design decisions:
- `add` calls `this.value.push(element)` then `this.notifySubscribers()` to emit
- `remove` uses `removeFromArray` utility on `this.value` then `this.notifySubscribers()` to emit
- No `clear` method for now
- Constructor creates a copy of the default value array if provided (defensive copy)
- `notifySubscribers()` is used instead of `this.value = this.value` because the setter's `!==` check would skip emission when the same array reference is assigned
- `deferred: true` is passed to the parent constructor so that multiple mutations in one cycle batch into a single notification

### Refactored AppNotificationsStore
Replace the two separate methods with a single observable property exposed as readonly:

```typescript
abstract get notifications(): ObservableReadonly<readonly AppNotification[]>;
```

This eliminates:
- `getNotifications()` — replaced by `notifications.value`
- `onNotificationsChange()` — replaced by `notifications.on()`
- The `isEmpty` property is kept as-is (still a separate `ObservableReadonly<boolean>`)

The `ObservableArray` type is used only in the implementation (`AppNotificationsStoreBase`), not exposed in the public interface. The public interface exposes `ObservableReadonly<readonly AppNotification[]>` to prevent external mutation.

## Detailed Steps

### Step 1: Add `notifySubscribers` to `ObservableWritableBase`

**File**: `app/modules/shared/entities/observableWritableBase.ts`

Add protected method:
```typescript
protected notifySubscribers(): void
{
    this.event.emit(this.valueInternal);
}
```

### Step 2: Create `observableArray.ts` (interface)

**File**: `app/modules/shared/entities/observableArray.ts`

```typescript
import type { ObservableWritable } from './observableWritable';

export interface ObservableArray<T> extends ObservableWritable<T[]>
{
    add(element: T): void;
    remove(element: T): boolean;
}
```

### Step 3: Create `observableArrayBase.ts` (implementation)

**File**: `app/modules/shared/entities/observableArrayBase.ts`

```typescript
import { ObservableWritableBase } from './observableWritableBase';
import type { ObservableArray } from './observableArray';
import { removeFromArray } from '@packages/shared';

export class ObservableArrayBase<T> extends ObservableWritableBase<T[]> implements ObservableArray<T>
{
    constructor(defaultValue: T[] = [])
    {
        super([...defaultValue], { deferred: true }); // defensive copy + deferred emit
    }

    add(element: T): void
    {
        this.value.push(element);
        this.notifySubscribers();
    }

    remove(element: T): boolean
    {
        const removed = removeFromArray(this.value, element);

        if (removed)
        {
            this.notifySubscribers();
        }

        return removed;
    }
}
```

### Step 4: Update `AppNotificationsStore` interface

**File**: `app/modules/notifications/entities/appNotificationsStore.ts`

Changes:
- Remove `getNotifications()` and `onNotificationsChange()` methods
- Add `abstract get notifications(): ObservableReadonly<readonly AppNotification[]>;`
- Keep `isEmpty: ObservableReadonly<boolean>` as-is
- Remove unused imports (`DisposeToken`, `Action`)

### Step 5: Update `AppNotificationsStoreBase` implementation

**File**: `app/modules/notifications/entities/appNotificationsStoreBase.ts`

Changes:
- Replace `private notifications = new Array<AppNotification>()` with `private notifications = new ObservableArrayBase<AppNotification>()`
- Remove `private notificationsChangeEvent = new EntityEvent<AppNotification[]>()`
- Add `get notifications()` getter that returns `this.notifications.toReadonly()` as `ObservableReadonly<readonly AppNotification[]>`
- `addNotification()` now calls `this.notifications.add(notification)` instead of manual push + event emit
- Remove `getNotifications()` override
- Remove `onNotificationsChange()` override
- Update disposal to dispose `this.notifications` instead of `this.notificationsChangeEvent`
- Remove unused imports (`EntityEvent`, `Action`, `DisposeToken`)

### Step 6: Update `TimelineBase`

**File**: `app/modules/notifications/entities/timelineBase.ts`

Changes:
- Replace `customRef` wrapping `getNotifications()` + `onNotificationsChange()` with direct subscription to `notificationStore.notifications`
- The `customRef` should use `notificationStore.notifications.on()` for triggering and `notificationStore.notifications.value` for reading
- Update `isEmpty` getter to keep delegating to store

### Step 7: Update `AppNotificationsStoreMock`

**File**: `app/modules/notifications/mocks/appNotificationsStoreMock.ts`

Changes:
- Replace `getNotifications: vi.fn()` and `onNotificationsChange: vi.fn()` with `notifications` property returning a mock `ObservableReadonly`
- Use `createObservableReadonlyMock` for the notifications property

### Step 8: Update tests

**File**: `app/modules/notifications/test/nuxt/notificationsStoreBase.test.skip.ts`

Changes:
- Unskip and update tests to use `store.notifications.value` instead of `store.getNotifications()`
- Update subscription tests to use `store.notifications.on()` instead of `store.onNotificationsChange()`

## Dependency Graph

```
observableWritable.ts (interface)
    ↑
observableWritableBase.ts (class) ── adds protected notifySubscribers()
    ↑
observableArray.ts (interface) ── extends ObservableWritable<T[]>
    ↑
observableArrayBase.ts (class) ── extends ObservableWritableBase<T[]> with { deferred: true }
    ↑
appNotificationsStoreBase.ts ── uses ObservableArrayBase<AppNotification>
appNotificationsStore.ts ── exposes ObservableReadonly<readonly AppNotification[]>
timelineBase.ts ── subscribes to notifications observable
```

## Migration Impact

| File | Change Type |
|------|-------------|
| `app/modules/shared/entities/observableWritableBase.ts` | **Modify** — add `notifySubscribers()` |
| `app/modules/shared/entities/observableArray.ts` | **New** |
| `app/modules/shared/entities/observableArrayBase.ts` | **New** |
| `app/modules/notifications/entities/appNotificationsStore.ts` | **Modify** |
| `app/modules/notifications/entities/appNotificationsStoreBase.ts` | **Modify** |
| `app/modules/notifications/entities/timelineBase.ts` | **Modify** |
| `app/modules/notifications/mocks/appNotificationsStoreMock.ts` | **Modify** |
| `app/modules/notifications/test/nuxt/notificationsStoreBase.test.skip.ts` | **Modify** |