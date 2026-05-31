# Plan: Move Button Viewmodels into `uikit/entities` with Renaming

## Overview

Move all button viewmodel interfaces and implementations from their current locations into `app/modules/uikit/entities/buttons/` with simplified naming. Update all import references across the codebase.

## Current File Locations

| Current Path | New Path | New Name |
|---|---|---|
| `app/modules/uikit/interfaces/buttonBaseViewmodel.ts` | `app/modules/uikit/entities/buttons/button.ts` | `button` (base interface) |
| `app/modules/uikit/viewmodels/buttons/buttonBaseViewmodelImpl.ts` | `app/modules/uikit/entities/buttons/buttonBase.ts` | `buttonBase` (base implementation) |
| `app/modules/uikit/interfaces/buttonGeneralViewmodel.ts` | `app/modules/uikit/entities/buttons/buttonGeneral.ts` | `buttonGeneral` (general button interface) |
| `app/modules/uikit/viewmodels/buttons/buttonGeneralViewmodelImpl.ts` | `app/modules/uikit/entities/buttons/buttonGeneralBase.ts` | `buttonGeneralBase` (general button implementation) |
| `app/modules/uikit/interfaces/buttonIconViewmodel.ts` | `app/modules/uikit/entities/buttons/buttonIcon.ts` | `buttonIcon` (icon button interface) |
| `app/modules/uikit/viewmodels/buttons/buttonIconViewmodelImpl.ts` | `app/modules/uikit/entities/buttons/buttonIconBase.ts` | `buttonIconBase` (icon button implementation) |

## Renaming Details

### Class/Type/Export Renames

| Old Name | New Name | File |
|---|---|---|
| `ButtonBaseViewmodel` (class) | `Button` | `button.ts` |
| `ButtonBaseViewmodelData` (type) | `ButtonData` | `button.ts` |
| `ButtonBaseViewmodelHandlers` (type) | `ButtonHandlers` | `button.ts` |
| `ButtonBaseViewmodelImpl` (class) | `ButtonBase` | `buttonBase.ts` |
| `ButtonGeneralViewmodel` (class) | `ButtonGeneral` | `buttonGeneral.ts` |
| `ButtonGeneralViewmodelData` (type) | `ButtonGeneralData` | `buttonGeneral.ts` |
| `ButtonGeneralViewmodelHandlers` (type) | `ButtonGeneralHandlers` | `buttonGeneral.ts` |
| `ButtonGeneralViewmodelImpl` (class) | `ButtonGeneralBase` | `buttonGeneralBase.ts` |
| `ButtonIconViewmodel` (class) | `ButtonIcon` | `buttonIcon.ts` |
| `ButtonIconViewmodelData` (type) | `ButtonIconData` | `buttonIcon.ts` |
| `ButtonIconViewmodelHandlers` (type) | `ButtonIconHandlers` | `buttonIcon.ts` |
| `ButtonIconViewmodelImpl` (class) | `ButtonIconBase` | `buttonIconBase.ts` |

## Files to Update (Import Paths & Type Names)

1. **`app/modules/uikit/factories/buttonsFactory.ts`** - Update imports from `../interfaces/buttonGeneralViewmodel` and `../interfaces/buttonIconViewmodel` to `../entities/buttons/buttonGeneral` and `../entities/buttons/buttonIcon`. Update type names.

2. **`app/modules/uikit/factories/buttonsFactoryImpl.ts`** - Update imports from interfaces and viewmodels/buttons to entities/buttons. Update type names and class names.

3. **`app/modules/uikit/mocks/buttonGeneralViewmodelMock.ts`** - Update import from `../interfaces/buttonGeneralViewmodel` to `../entities/buttons/buttonGeneral`. Update type name.

4. **`app/modules/overlay/entities/modalConfirm.ts`** - Update import from `@/modules/uikit/interfaces/buttonGeneralViewmodel` to `@/modules/uikit/entities/buttons/buttonGeneral`. Update type name.

5. **`app/modules/overlay/entities/modalConfirmBase.ts`** - Update imports from `@/modules/uikit/interfaces/buttonGeneralViewmodel` to `@/modules/uikit/entities/buttons/buttonGeneral`. Update type names.

6. **`app/modules/overlay/mocks/modalConfirmMock.ts`** - Update import from `@/modules/uikit/mocks/buttonGeneralViewmodelMock` - this path stays the same, but the mock's internal type reference will be updated.

## Files to Delete

- `app/modules/uikit/interfaces/buttonBaseViewmodel.ts`
- `app/modules/uikit/interfaces/buttonGeneralViewmodel.ts`
- `app/modules/uikit/interfaces/buttonIconViewmodel.ts`
- `app/modules/uikit/viewmodels/buttons/buttonBaseViewmodelImpl.ts`
- `app/modules/uikit/viewmodels/buttons/buttonGeneralViewmodelImpl.ts`
- `app/modules/uikit/viewmodels/buttons/buttonIconViewmodelImpl.ts`

## Execution Order

1. Create new files in `app/modules/uikit/entities/buttons/` with renamed content
2. Update all referencing files with new import paths and type names
3. Delete old files
4. Verify no remaining references to old paths

## Verification

After all changes, run a search for any remaining references to:
- `buttonBaseViewmodel` (case-insensitive)
- `buttonGeneralViewmodel` (case-insensitive)
- `buttonIconViewmodel` (case-insensitive)
- `viewmodels/buttons` (path reference)
- `interfaces/button` (path reference)