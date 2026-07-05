# Refactor use{Name}Services Composables

## Current State

There are service registration composables in various modules:
- `useSharedServices` in apps/client/app/modules/shared/composables/
- `useUIKitServices` in apps/client/app/modules/uikit/composables/
- `useFormsServices` in apps/client/app/modules/forms/composables/
- `useOverlayServices` in apps/client/app/modules/overlay/composables/
- `useTodoServices` in apps/client/app/modules/todo/composables/
- `useSidebarServices` in apps/client/app/modules/sidebar/composables/
- `useNotificationsServices` in apps/client/app/modules/notifications/composables/

All these composables use `useServicesContainer()` implicitly to get the `ServicesContainer`.

## Target Architecture

1. Move service registration logic to `utils/` folders within each module
2. Rename functions from `use{Name}Services` to `register{Name}Services`
3. Functions should accept `ServicesContainer` as a parameter instead of using implicit container
4. `useAppServices` should remain as a composable but call the new `register*` functions

## Implementation Steps

### Step 1: Refactor useSharedServices
- Create `apps/client/app/modules/shared/utils/` folder (if not exists)
- Rename to `registerSharedServices.ts`
- Add `ServicesContainer` parameter
- Replace `useServiceRegistration()` with `container.bind()`
- Keep I18n and RuntimeConfig handling inside the function

### Step 2: Refactor useUIKitServices
- Create `apps/client/app/modules/uikit/utils/` folder
- Rename to `registerUIKitServices.ts`
- Add `ServicesContainer` parameter
- Replace `useServiceRegistration()` with `container.bind()`

### Step 3: Refactor useFormsServices
- Create `apps/client/app/modules/forms/utils/` folder
- Rename to `registerFormsServices.ts`
- Add `ServicesContainer` parameter
- Replace `useServiceRegistration()` with `container.bind()`

### Step 4: Refactor useOverlayServices
- Create `apps/client/app/modules/overlay/utils/` folder
- Rename to `registerOverlayServices.ts`
- Add `ServicesContainer` parameter
- Replace `useServiceRegistration()` with `container.bind()`

### Step 5: Refactor useTodoServices
- Create `apps/client/app/modules/todo/utils/` folder
- Rename to `registerTodoServices.ts`
- Add `ServicesContainer` parameter
- Replace `useServiceRegistration()` with `container.bind()`
- Keep RuntimeConfig handling inside the function

### Step 6: Refactor useSidebarServices
- Create `apps/client/app/modules/sidebar/utils/` folder
- Rename to `registerSidebarServices.ts`
- Add `ServicesContainer` parameter
- Replace `useServiceRegistration()` with `container.bind()`

### Step 7: Refactor useNotificationsServices
- Create `apps/client/app/modules/notifications/utils/` folder
- Rename to `registerNotificationsServices.ts`
- Add `ServicesContainer` parameter
- Replace `useServiceRegistration()` with `container.bind()`

### Step 8: Update useAppServices
- Get container using `useServicesContainer(true)`
- Pass container to all `register*` functions

### Step 9: Update all imports
- Search for any usages of the old composable names
- Update imports to point to new utility functions

## Files to Create

1. `apps/client/app/modules/shared/utils/registerSharedServices.ts`
2. `apps/client/app/modules/uikit/utils/registerUIKitServices.ts`
3. `apps/client/app/modules/forms/utils/registerFormsServices.ts`
4. `apps/client/app/modules/overlay/utils/registerOverlayServices.ts`
5. `apps/client/app/modules/todo/utils/registerTodoServices.ts`
6. `apps/client/app/modules/sidebar/utils/registerSidebarServices.ts`
7. `apps/client/app/modules/notifications/utils/registerNotificationsServices.ts`

## Files to Modify

1. `apps/client/app/composables/useAppServices.ts`
2. Storybook files that import useSharedServices (10 files)

## Files to Delete (after confirming usages are updated)

1. `apps/client/app/modules/shared/composables/useSharedServices.ts`
2. `apps/client/app/modules/uikit/composables/useUIKitServices.ts`
3. `apps/client/app/modules/forms/composables/useFormsServices.ts`
4. `apps/client/app/modules/overlay/composables/useOverlayServices.ts`
5. `apps/client/app/modules/todo/composables/useTodoServices.ts`
6. `apps/client/app/modules/sidebar/composables/useSidebarServices.ts`
7. `apps/client/app/modules/notifications/composables/useNotificationsServices.ts`

## Storybook Files to Update

1. `apps/client/app/modules/uikit/stories/VToolbar.stories.ts`
2. `apps/client/app/modules/uikit/stories/VInputTime.stories.ts`
3. `apps/client/app/modules/uikit/stories/VInputDateTime.stories.ts`
4. `apps/client/app/modules/uikit/stories/VInputDate.stories.ts`
5. `apps/client/app/modules/uikit/stories/VInfoBlock.stories.ts`
6. `apps/client/app/modules/uikit/stories/VGrid.stories.ts`
7. `apps/client/app/modules/uikit/stories/VCard.stories.ts`
8. `apps/client/app/modules/uikit/stories/VButtonIcon.stories.ts`
9. `apps/client/app/modules/uikit/stories/VButtonGeneral.stories.ts`
10. `apps/client/app/modules/todo/stories/VTodoCard.stories.ts`

## Implementation Order

1. Create utils folders for all modules
2. Create all new register* functions
3. Update useAppServices
4. Update all Storybook files
5. Delete old composable files
