# Plan: Extract Shared Module to Shared Package

## Overview
Extract the shared module from `apps/client/app/modules/shared` into a new `packages/shared` package.

## Current State
- Shared module located at: `apps/client/app/modules/shared`
- Package structure: `packages/di`, `packages/ssr`, `packages/storybook`
- Project uses pnpm workspaces

## Steps Completed

### ✅ Step 1: Create packages/shared directory structure
- Created `packages/shared/src` directory
- Created `packages/shared/test/unit` directory
- Copied all shared module files to `packages/shared/src`

### ✅ Step 2: Create package.json for shared package
- Added package configuration with name `@packages/shared`
- Added dependency on `@packages/di`

### ✅ Step 3: Update directory structure
- Reorganized files to match package structure:
  - `packages/shared/src/composables/`
  - `packages/shared/src/constants/`
  - `packages/shared/src/entities/`
  - `packages/shared/src/enums/`
  - `packages/shared/src/exceptions/`
  - `packages/shared/src/interfaces/`
  - `packages/shared/src/mappers/`
  - `packages/shared/src/services/`
  - `packages/shared/src/types/`
  - `packages/shared/src/utils/`
  - `packages/shared/src/test/unit/` (for unit tests)

### ✅ Step 4: Create index.ts entry point
- Exported all public APIs from the shared package
- Note: `useStorybookSharedServices` was NOT moved to the package as it depends on app-level composables

### ✅ Step 5: Update internal imports in the shared package
- Updated internal imports within the shared package to use relative paths
- Fixed `registerSharedServices.ts` to use relative imports

### ✅ Step 6: Configure package aliases in Nuxt and Vite
- Added `@packages/shared` alias to `nuxt.config.ts`
- Added `@packages/shared` alias to `vite.config.ts`

### ✅ Step 7: Copy test files
- Moved all unit tests to `packages/shared/test/unit/`

### ✅ Step 8: Verify pnpm workspace configuration
- `pnpm-workspace.yaml` already includes `packages/*` so no changes needed

### ⏭️ Step 9: Update imports in apps/client (to be done manually)
- Files that need to be updated (replace `@/modules/shared` with `@packages/shared`):
  - `apps/client/app/composables/useObservableReadonly.ts`
  - `apps/client/app/composables/useGlobalErrorsHandler.ts`
  - `apps/client/app/composables/useEventDrivenRef.ts`
  - `apps/client/app/composables/useAppServices.ts` (already updated)
  - `apps/client/app/modules/uikit/stories/*.stories.ts`
  - `apps/client/app/modules/todo/*.ts`
  - `apps/client/app/modules/overlay/*.ts`
  - `apps/client/app/modules/notifications/*.ts`
  - `apps/client/app/modules/forms/*.ts`
  - `apps/client/app/modules/sidebar/*.ts`
  - `apps/client/app/modules/uikit/*.ts`
  - And many more...

### ⏭️ Step 10: Verify the extraction
- Run type checking: `pnpm typecheck`
- Run tests: `pnpm test`

## Files Created
- `packages/shared/package.json`
- `packages/shared/index.ts`
- `packages/shared/tsconfig.json`
- All source files from shared module in `packages/shared/src/`
- All test files in `packages/shared/test/unit/`

## Files Modified
- `apps/client/nuxt.config.ts` (added @packages/shared alias)
- `apps/client/vite.config.ts` (added @packages/shared alias)
- `apps/client/app/composables/useAppServices.ts` (updated import)
- `apps/client/app/modules/shared/composables/useStorybookSharedServices.ts` (updated to use @packages/shared)

## Notes
- `useStorybookSharedServices` was intentionally NOT moved to the shared package as it depends on app-level composables like `useServicesContainer`
- The shared package is now ready for use, but you need to update all imports in the app from `@/modules/shared` to `@packages/shared`
- After updating imports, you can safely delete the old `apps/client/app/modules/shared` directory
