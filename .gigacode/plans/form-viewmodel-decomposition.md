# FormViewmodelImpl Decomposition Plan

## Overview
Decompose FormViewmodelImpl into focused entities with clear separation of concerns.

## Updated Architecture

### Entity Architecture
Entities will be implemented as simple classes (no abstract interfaces):
- **Entity names without "Impl" postfix** - the implementation class name
- Entities are instantiated with form elements passed to constructor
- FormViewmodelImpl constructs all entities internally

### 0. ViewmodelState (NEW ENTITY)
**File:** `packages/ui/core/src/entities/viewmodelState.ts`

**Purpose:** Wrapper for state that provides update method

**Dependencies:**
- ObservableWritableBase (from @client/shared) - used internally for state management

**Constructor:**
- `constructor(defaultValue: TState)` - initializes with default state

**Properties:**
- `value: TState` - readonly property for current state value

**Methods:**
- `on(handler: Action<[TState]>, disposeToken?: DisposeToken): void` - subscribes to state changes (delegates to internal ObservableWritableBase)
- `update(partialState: Partial<TState>): void` - merges partial state with current state using mergeDeep and notifies subscribers
- `toReadonly(): ObservableReadonly<TState>` - returns itself as readonly
- `[Symbol.dispose](): void` - disposes internal event

**Implementation:**
- Internally uses ObservableWritableBase<TState> to manage state
- `update()` calls `observableWritableBase.value = mergeDeep(currentValue, partialState)`

**Tests:** `packages/ui/core/test/unit/viewmodelState.test.ts`

### 1. FormDataContext (was FormDataService)
**File:** `packages/ui/forms/src/entities/formDataContext.ts`

**Purpose:** Extract data management - `getData()`, `setData()` methods

**Dependencies:**
- FormElement interface
- ViewmodelState

**Constructor:**
- `constructor(elements: FormElement[], state: ViewmodelState<FormViewmodelState<any>>)` - state passed for mutation in setData

**Methods:**
- `getData<TEntity extends Record<string, any>>(): Record<keyof TEntity, any>` - collects values from all elements
- `setData(changeData: Partial<Record<keyof TEntity, any>>): void`
  - Updates element values and resets non-matching elements
  - Gets the new data
  - Calls `this.state.update({ data: newData })`

### 2. FormLock (was FormLockService)
**File:** `packages/ui/forms/src/entities/formLock.ts`

**Purpose:** Extract enable/disable state management

**Dependencies:**
- FormElement interface
- FormDisabledException
- ViewmodelState

**Constructor:**
- `constructor(elements: FormElement[], state: ViewmodelState<FormViewmodelState<any>>)` - state passed as constructor dependency

**Key Changes:**
- Methods don't accept ViewmodelState as parameter - it's stored in constructor
- Methods call `this.state.update()` to modify state
- Methods work directly with elements

**Methods:**
- `isDisabled(): boolean` - returns isDisabled from state
- `enable(): void` - updates state with isDisabled: false
- `disable(): void` - updates state with isDisabled: true
- `assertNotDisabled(): void` (throws if disabled)

### 3. FormValidator (was FormValidationService)
**File:** `packages/ui/forms/src/entities/formValidator.ts`

**Purpose:** Extract validation logic

**Dependencies:**
- FormElement interface
- FormValidationError entity
- FormElementValidationError entity
- ViewmodelState

**Constructor:**
- `constructor(elements: FormElement[], state: ViewmodelState<FormViewmodelState<any>>)` - state passed as constructor dependency

**Key Changes:**
- Methods don't accept ViewmodelState as parameter - it's stored in constructor
- Methods call `this.state.update()` to modify state
- `validationError` property is **readonly** and stores current validation error
- `getElementValidationErrors()` replaced by internal logic

**Methods:**
- `validate(): void` - validates elements and updates state.errors
- `isValid(): boolean` - checks if all elements are valid
- `validationError: FormValidationError | undefined` - **readonly** property for current validation error
- `getElementValidationErrors(): FormElementValidationError[]` - internal helper

### 4. FormEvents (was FormEmitter)
**File:** `packages/ui/forms/src/entities/formEvents.ts`

**Purpose:** Expose form-level events directly (no logic, just data structure)

**Dependencies:**
- EntityEvent
- FormValidationError entity

**Constructor:**
- `constructor()`

**Properties:**
- `formValidationErrorEvent: EntityEvent<FormValidationError>` - event for form validation errors

**Key Changes:**
- Simple data structure with no logic - just exposes events directly
- No methods needed - events are accessed directly via properties

### 5. Refactor FormViewmodelImpl
**File:** `packages/ui/forms/src/viewmodels/formViewmodelImpl.ts`

**Changes:**
- Construct all four entities internally in constructor:
  - `this.formDataContext = new FormDataContext(elements, this.state);`
  - `this.formLock = new FormLock(elements, this.state);`
  - `this.formEvents = new FormEvents();`
  - `this.formValidator = new FormValidator(elements, this.state);`
- Initialize state with `new ViewmodelState<FormViewmodelState<TEntity>>({ elements, data: this.getData(), isDisabled: false })`
- Remove the extracted private methods from FormViewmodelImpl
- Update method calls to use the entity instances:
  - `getData()` → `this.formDataContext.getData()`
  - `setData()` → `this.formDataContext.setData(changeData)`
  - `isValid()` → `this.formValidator.isValid()`
  - `validate()` → `this.formValidator.validate()`
  - `isDisabled()` → `this.formLock.isDisabled()`
  - `disable()` → `this.formLock.disable()`
  - `enable()` → `this.formLock.enable()`
  - `assertNotDisabled()` → `this.formLock.assertNotDisabled()`
- In submit command:
  - Call `this.formValidator.validate()`
  - Check `this.formValidator.isValid()`
  - If invalid, call `this.formEvents.formValidationErrorEvent.emit()` with non-nullable error
- Maintain the same public API

### 6. Add Tests
**Files to create:**
- `packages/ui/core/test/unit/viewmodelState.test.ts`
- `packages/ui/forms/test/unit/formDataContext.test.ts`
- `packages/ui/forms/test/unit/formLock.test.ts`
- `packages/ui/forms/test/unit/formValidator.test.ts`

**Test coverage:**
- ViewmodelState: Test state initialization, update, subscription, and disposal
- FormDataContext: Test data collection and update from elements
- FormLock: Test enable/disable state changes and exception throwing
- FormValidator: Test validation logic and readonly validationError property
- FormEvents: No tests needed (simple data structure with no logic)

## Dependencies to Add
- ViewmodelState from '@client/ui-core' (new entity using ObservableWritableBase)
- EntityEvent from '@client/shared' (likely already available)

## Breaking Changes
- None expected - entities will be internal implementation details
- Public API of FormViewmodelImpl remains the same
