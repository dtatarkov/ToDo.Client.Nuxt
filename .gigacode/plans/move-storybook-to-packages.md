# Plan: Move Storybook to Packages

## Summary
Move storybook-related code from apps/client/app/modules into a dedicated packages/storybook module. Keep registerSharedServices in its current location.

## Tasks

### 1. Create packages/storybook structure
- Create directories: packages/storybook/src/argTypes, packages/storybook/src/composables
- Create package.json for storybook package
- Create index.ts file to export all storybook functionality

### 2. Move storybook argTypes
- Move all files from apps/client/app/modules/uikit/storybook to packages/storybook/src/argTypes
- Files to move: storybookColorSelect.ts, inputPlaceholderArgType.ts, inputNameArgType.ts, inputIsDisabledArgType.ts, inputIdArgType.ts, inputHighlightArgType.ts, inputHasAutofocusArgType.ts

### 3. Move composables
- Move useStorybookSharedServices.ts from apps/client/app/modules/shared/composables to packages/storybook/src/composables

### 4. Update index file
- Create packages/storybook/src/index.ts that exports all storybook functionality
- Export argTypes and composables from the index file

### 5. Update vite.config.ts aliases
- Add '@packages/storybook' alias pointing to packages/storybook/src

### 6. Update imports in affected files
- Update imports in apps/client/app/modules/uikit/stories/*.stories.ts files
- Update any other files that import from moved locations

### 7. Verify the changes
- Run typecheck to ensure no import errors
- Ensure storybook still works correctly
