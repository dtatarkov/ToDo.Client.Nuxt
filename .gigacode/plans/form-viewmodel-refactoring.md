# Form Viewmodel Refactoring Plan

## Overview
Rework `Form`/`FormBase` into `FormViewmodel`/`FormViewmodelImpl` that extends `Viewmodel<FormViewmodelState>`.

## Current Structure
- `Form<TEntity>` - abstract base class with form interface
- `FormBase<TEntity>` - concrete implementation with elements, validation, submit handling

## New Structure
- `FormViewmodelState<K>` - state type with elements, data, errors, isDisabled
- `FormViewmodel<K, TEntity>` - abstract viewmodel extending `Viewmodel<FormViewmodelState<K>>`
  - Matches Form interface exactly
  - Adds `state: ObservableReadonly<FormViewmodelState<K>>`
- `FormViewmodelImpl<K, TEntity>` - concrete implementation

## FormViewmodelState Type
```typescript
export type FormViewmodelState<K extends string = string> = {
  elements: Record<K, FormElementData>;
  data?: Record<K, any>;
  errors?: Partial<Record<K, MessageKey>>;
  isDisabled?: boolean;
};
```

## New FormViewmodel Interface
Should extend `Viewmodel<FormViewmodelState<K>>` and match `Form<TEntity>` exactly:
- `getElements(): FormElement[]`
- `getData(): Record<keyof TEntity, any>`
- `setData(data: Record<keyof TEntity, any>): void`
- `isDisabled(): boolean`
- `getSubmitCommand(): AsyncCommand`
- `onValidationError(handler: Action<[FormValidationError]>, token?: DisposeToken): void`
- `[Symbol.dispose](): void`
- `state: ObservableReadonly<FormViewmodelState<K>>` (NEW)

## Implementation Steps

### 1. Create FormViewmodelState Type
- File: `packages/ui/core/src/types/formViewmodelState.ts`

### 2. Create FormViewmodel Abstract Class
- File: `packages/ui/core/src/viewmodels/formViewmodel.ts`
- Extend `Viewmodel<FormViewmodelState<K>>`
- Implement all Form<TEntity> abstract methods
- Add `state: ObservableReadonly<FormViewmodelState<K>>`

### 3. Create FormViewmodelImpl
- File: `packages/ui/core/src/viewmodels/formViewmodelImpl.ts`
- Implement all abstract methods from `FormViewmodel`
- Use `ObservableWritableBase<FormViewmodelState<K>>` for state
- Maintain internal elements collection (FormElement[])
- Handle validation, data management, and error tracking

### 4. Update FormFactory
- Modify `FormFactoryImpl` to return `FormViewmodel` instead of `FormBase`

### 5. Tests
- **FormBase tests remain unchanged** - do not touch them
- Add new tests for `FormViewmodelImpl` based on FormBase tests

### 6. Export New Types
- Update `packages/ui/core/src/index.ts` to export new viewmodel types

## Files to Create
1. `packages/ui/core/src/types/formViewmodelState.ts`
2. `packages/ui/core/src/viewmodels/formViewmodel.ts`
3. `packages/ui/core/src/viewmodels/formViewmodelImpl.ts`
4. `packages/ui/core/test/unit/formViewmodelImpl.test.ts` (based on formBase.test.ts)

## Files to Modify
1. `packages/ui/core/src/factories/formFactoryImpl.ts`
2. `packages/ui/core/src/index.ts`

## Migration Notes
- The new `FormViewmodel` matches the `Form` interface exactly
- Only difference is the added `state` property for reactive state access
- Maintains all existing functionality: validation, submit handling, disable/enable
- Aligns with the existing viewmodel pattern used in the codebase
- VForm.vue and FormProps remain unchanged - they're separate from FormViewmodel
- FormBase tests are NOT modified; new FormViewmodelImpl tests are added separately
