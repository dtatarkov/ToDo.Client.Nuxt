# Add `addRootNotification` Method Plan

## Task Description
Add a private `addRootNotification(data)` method to `AppNotificationsStoreBase` to make the `addNotification` method more declarative and extract the logic for creating new root notifications.

## Current Implementation
In `app/modules/notifications/entities/appNotificationsStoreBase.ts`:
- The `addNotification` method currently inline creates a new `AppRootNotificationBase` when notifications cannot be added to the last root

## Changes Required

### 1. Update `appNotificationsStoreBase.ts`
- Add private method `addRootNotification(data: AppNotificationData): AppRootNotification`
- This method should:
  - Create a new `AppRootNotificationBase` instance
  - Add it to the `notifications` array
  - Return the created root notification
- Update `addNotification` to use this new private method instead of inline creation

### 2. Files to Modify
- `app/modules/notifications/entities/appNotificationsStoreBase.ts`

## Benefits
- Declarative code: The `addNotification` method will be more readable
- Reusable logic: The `addRootNotification` method can be used elsewhere if needed
- Better separation of concerns: Root notification creation logic is extracted

## Implementation Steps
1. Add the private `addRootNotification` method to `AppNotificationsStoreBase`
2. Update the `addNotification` method to call `addRootNotification` instead of inline creation
3. Verify the implementation works correctly
