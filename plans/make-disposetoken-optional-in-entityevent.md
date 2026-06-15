# Plan: Make `disposeToken` Optional in `EntityEvent.on` and All Derived `on{Event}` Methods

## Goal

Make the `disposeToken`/`callbackDisposeToken` parameter optional in `EntityEvent.on()` and all `on{Event}()` methods across the codebase. When omitted, the callback is bound to the event's lifecycle (i.e., it lives until the event itself is disposed). When provided, the callback is unsubscribed when the dispose token is disposed (existing behavior).

**Important constraints:**
- Do NOT remove `disposeToken` propagation anywhere in production code. Only remove unnecessary `DisposeToken` construction in unit tests.
- Do NOT change `useEventDrivenRef` composable signature.

## Core Change: `EntityEvent.on()`

**File:** [`app/modules/shared/entities/entityEvent.ts`](app/modules/shared/entities/entityEvent.ts)

```typescript
// Current signature (line 9):
on(handler: Action<[T]>, callbackDisposeToken: DisposeToken): void

// New signature:
on(handler: Action<[T]>, callbackDisposeToken?: DisposeToken): void
```

**Logic change:**
- If `callbackDisposeToken` is provided and already disposed → return early (existing behavior)
- If `callbackDisposeToken` is provided → add handler and register cleanup on dispose token (existing behavior)
- If `callbackDisposeToken` is **not** provided → add handler, but do NOT register any cleanup. The handler will live until the event itself is disposed (via `[Symbol.dispose]()` which clears all handlers).

## Propagation to All `on{Event}()` Methods

Every `on{Event}()` method that wraps `EntityEvent.on()` must also make its `disposeToken`/`token` parameter optional. This includes:

### 1. AsyncCommand hierarchy

| File | Method | Current Signature |
|------|--------|-------------------|
| [`app/modules/shared/entities/asyncCommand.ts`](app/modules/shared/entities/asyncCommand.ts) | `onIdle`, `onExecuting`, `onExecuted` | `(handler: Action, token: DisposeToken): void` |
| [`app/modules/shared/entities/asyncCommandBase.ts`](app/modules/shared/entities/asyncCommandBase.ts) | `onIdle`, `onExecuting`, `onExecuted` | `(handler: Action, token: DisposeToken): void` |

### 2. Button hierarchy

| File | Method | Current Signature |
|------|--------|-------------------|
| [`app/modules/uikit/entities/buttons/button.ts`](app/modules/uikit/entities/buttons/button.ts) | `onClick` | `(handler: Action, disposeToken: DisposeToken): void` |
| [`app/modules/uikit/entities/buttons/buttonBase.ts`](app/modules/uikit/entities/buttons/buttonBase.ts) | `onClick` | `(handler: Action, disposeToken: DisposeToken): void` |

### 3. ToDosOwner hierarchy

| File | Method | Current Signature |
|------|--------|-------------------|
| [`app/modules/todo/entities/todosOwner.ts`](app/modules/todo/entities/todosOwner.ts) | `onToDosChange` | `(callback: Action<[ToDo[]]>, disposeToken: DisposeToken): void` |
| [`app/modules/todo/entities/todosOwnerBase.ts`](app/modules/todo/entities/todosOwnerBase.ts) | `onToDosChange` | `(callback: Action<[ToDo[]]>, disposeToken: DisposeToken): void` |

### 4. Overlay hierarchy

| File | Method | Current Signature |
|------|--------|-------------------|
| [`app/modules/overlay/entities/overlay.ts`](app/modules/overlay/entities/overlay.ts) | `onElementsChange` | `(callback: Action<[OverlayElement[]]>, disposeToken: DisposeToken): void` |
| [`app/modules/overlay/entities/overlayBase.ts`](app/modules/overlay/entities/overlayBase.ts) | `onElementsChange` | `(callback: Action<[OverlayElement[]]>, disposeToken: DisposeToken): void` |

### 5. Form hierarchy

| File | Method | Current Signature |
|------|--------|-------------------|
| [`app/modules/forms/entities/form.ts`](app/modules/forms/entities/form.ts) | `onError` | `(handler: Action<[FormValidationError]>, token: DisposeToken): void` |
| [`app/modules/forms/entities/formBase.ts`](app/modules/forms/entities/formBase.ts) | `onError` | `(handler: Action<[FormValidationError]>, token: DisposeToken): void` |

### 6. InputElement hierarchy

| File | Method | Current Signature |
|------|--------|-------------------|
| [`app/modules/forms/entities/inputElements/inputElement.ts`](app/modules/forms/entities/inputElements/inputElement.ts) | `onValueChange` | `(handler: Action<[value: V]>, disposeToken: DisposeToken): void` |
| [`app/modules/forms/entities/inputElements/inputElementBase.ts`](app/modules/forms/entities/inputElements/inputElementBase.ts) | `onValueChange` | `(handler: Action<[value: V]>, disposeToken: DisposeToken): void` |

## Production Code — NO CHANGES to disposeToken Propagation

All existing callers in production code **keep** their `disposeToken` argument as-is. The following files pass a disposeToken and will NOT be modified:

- [`formElementBase.ts`](app/modules/forms/entities/formElementBase.ts) — `setupInputValueTracking()` passes `this.disposeToken`
- [`modalBase.ts`](app/modules/overlay/entities/modalBase.ts) — `buttonCancel.onClick` and `setupCommandTracking` pass `this.disposeToken`
- [`buttonGeneralBase.ts`](app/modules/uikit/entities/buttons/buttonGeneralBase.ts) — `setCommand` passes `this.disposeToken`
- [`useEventDrivenRef.ts`](app/modules/shared/composables/useEventDrivenRef.ts) — passes `disposeToken` from service container (signature unchanged)

## Test Files — Remove Unnecessary DisposeToken Construction

These tests create a `DisposeToken` solely to satisfy the required parameter but never use it for disposal. Since the parameter is now optional, the token construction can be removed.

### Tests that can drop DisposeToken (token created but never disposed):

1. **`event.test.ts`** — Tests 1, 2, 3 (lines 11, 23, 36):
   - "should call handler on emit"
   - "should pass value to handler on emit"
   - "should call multiple handlers on emit"

2. **`asyncCommandBase.test.ts`** — Tests (lines 15, 30, 46, 69, 83, 106):
   - "should execute and call onExecuted with resolved true"
   - "should call onExecuting then onIdle during execution"
   - "should not call onExecuted when result is false"
   - "should call onIdle even on rejection"
   - "should not call onExecuted on rejection"
   - "should coerce undefined result to true and call onExecuted"

3. **`todosOwnerBase.test.ts`** — Tests (lines 152, 167):
   - "should invoke callback when todo is added"
   - "should invoke callback when todos are updated"

4. **`overlay.test.ts`** — Tests (lines 239, 256):
   - "should invoke callback when element is added"
   - "should invoke callback when element is removed"

5. **`buttonGeneralBase.test.ts`** — Test (line 197):
   - "should register and invoke click handler"

6. **`buttonIconBase.test.ts`** — Test (line 124):
   - "should register and invoke click handler"

### Tests that MUST keep DisposeToken (used for disposal testing):

1. **`event.test.ts`** — Tests 4, 5, 6 (lines 50, 63, 74):
   - "should not call handler after dispose token is disposed"
   - "should throw when adding handler after event is disposed"
   - "should silently ignore handler when adding with disposed token"

2. **`asyncCommandBase.test.ts`** — Tests in `onIdle`, `onExecuting`, `onExecuted` describe blocks (lines 131, 144, 157):
   - "should throw DisposedException when registered after dispose"

3. **`buttonGeneralBase.test.ts`** — Test (line 208):
   - "should throw DisposedException when registered after dispose"

4. **`buttonIconBase.test.ts`** — Test (line 135):
   - "should throw DisposedException when registered after dispose"

5. **`formBase.test.ts`** — Tests (lines 151, 186, 212):
   - All three tests create `disposeToken` and call `disposeToken[Symbol.dispose]()` at the end → **keep**

## Implementation Order

The implementation should follow this order to avoid TypeScript compilation errors:

1. **Core**: [`entityEvent.ts`](app/modules/shared/entities/entityEvent.ts) — make `callbackDisposeToken` optional
2. **Abstract classes**: Update all abstract method signatures
   - [`asyncCommand.ts`](app/modules/shared/entities/asyncCommand.ts)
   - [`button.ts`](app/modules/uikit/entities/buttons/button.ts)
   - [`todosOwner.ts`](app/modules/todo/entities/todosOwner.ts)
   - [`overlay.ts`](app/modules/overlay/entities/overlay.ts)
   - [`form.ts`](app/modules/forms/entities/form.ts)
   - [`inputElement.ts`](app/modules/forms/entities/inputElements/inputElement.ts)
3. **Implementations**: Update all concrete implementations
   - [`asyncCommandBase.ts`](app/modules/shared/entities/asyncCommandBase.ts)
   - [`buttonBase.ts`](app/modules/uikit/entities/buttons/buttonBase.ts)
   - [`todosOwnerBase.ts`](app/modules/todo/entities/todosOwnerBase.ts)
   - [`overlayBase.ts`](app/modules/overlay/entities/overlayBase.ts)
   - [`formBase.ts`](app/modules/forms/entities/formBase.ts)
   - [`inputElementBase.ts`](app/modules/forms/entities/inputElements/inputElementBase.ts)
4. **Tests**: Remove unnecessary `DisposeToken` construction
   - [`event.test.ts`](app/modules/shared/test/unit/event.test.ts)
   - [`asyncCommandBase.test.ts`](app/modules/shared/test/unit/asyncCommandBase.test.ts)
   - [`todosOwnerBase.test.ts`](app/modules/todo/test/unit/todosOwnerBase.test.ts)
   - [`overlay.test.ts`](app/modules/overlay/test/nuxt/overlay.test.ts)
   - [`buttonGeneralBase.test.ts`](app/modules/uikit/test/nuxt/buttonGeneralBase.test.ts)
   - [`buttonIconBase.test.ts`](app/modules/uikit/test/nuxt/buttonIconBase.test.ts)

## Mermaid Diagram: Change Flow

```mermaid
flowchart TD
    A[EntityEvent.on handler, callbackDisposeToken?] --> B{callbackDisposeToken provided?}
    B -->|No| C[Add handler to Set<br>No cleanup registration<br>Handler lives until event disposed]
    B -->|Yes| D{Is callbackDisposeToken disposed?}
    D -->|Yes| E[Return early - do nothing]
    D -->|No| F[Add handler to Set<br>Register cleanup on disposeToken]
    
    C --> G[Event[Symbol.dispose] clears all handlers]
    F --> H[DisposeToken[Symbol.dispose] removes specific handler]
```

## Risk Assessment

- **Low risk**: The change is backward-compatible — all existing callers still compile since the parameter is optional
- **Low risk**: Internal callers that currently pass a disposeToken continue to work identically (no production code changes to callers)
- **No risk to tests**: Tests that drop DisposeToken construction are simplified but functionally equivalent since the callback is expected to live for the test duration