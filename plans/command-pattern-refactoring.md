# Command Pattern Refactoring — Separating Actions from UIElement

## Problem Analysis

### Current Design Issue

The current architecture has a problematic coupling:

1. **`ActionUIElement`** (app/modules/uikit/entities/actionUIElement.ts) asserts that every element with an action must be a `UIElement`. This forces `Form` to extend `ActionUIElement`, meaning the action is **owned by** the UI element.

2. **`ModalConfirmBase`** (app/modules/overlay/entities/modalConfirmBase.ts:58-74) calls `content.action.setActionStateChangeHandler(...)` — this means the modal **owns the action's state change handler**, but the action itself is owned by the form (the content). This creates an implicit ownership chain: Modal → Form's action → Form, which is fragile and unclear.

3. **`UIElementAction.setActionStateChangeHandler`** (app/modules/uikit/entities/uiElementAction.ts:14) uses `HandlerWrapper` (app/modules/shared/entities/handlerWrapper.ts) which throws `HandlerAlreadySetException` if a handler is already set. This means only **one** consumer can ever listen to action state changes — a severe limitation.

### The Core Insight

> Actions have no inherent relation to UIElement. They are a separate concern.

The current `ActionUIElement` conflates two things:
- A UI element that can be rendered (`UIElement`)
- A command that can be executed (`UIElementAction`)

These should be separate. The `Form` should not need to be an `ActionUIElement` just because it can submit. Instead, it should **return a command** that the modal can consume.

---

## Proposed Solution: Command Pattern

### New Types

```typescript
// AsyncCommand<T> — a command that produces a result of type T
export abstract class AsyncCommand<T>
{
    abstract executeAsync(): Promise<T>;
    abstract setExecutionHandler(handler: Action<[Promise<T>]>): void;
}
```

Key differences from current `UIElementAction`:
- **`executeAsync()` returns `Promise<T>`** instead of `Promise<void>` — the caller gets the actual result
- **`setExecutionHandler(handler: Action<[Promise<T>]>): void`** — the handler receives the **Promise** of the result, not a state enum. This is more flexible: the handler can await the promise, chain it, etc.
- No `UIElementActionState` enum — the state management moves to the consumer (the modal)
- No `actionState` property — the command doesn't track state, it just executes

### AsyncCommandImpl<T> — Generic Implementation

```typescript
// A generic implementation that accepts an execution handler
export class AsyncCommandImpl<T> extends AsyncCommand<T>
{
    private executionHandler: Action<[Promise<T>]> | undefined;

    constructor(
        private executeInternal: Func<Promise<T>>
    )
    {
        super();
    }

    setExecutionHandler(handler: Action<[Promise<T>]>): void
    {
        this.executionHandler = handler;
    }

    async executeAsync(): Promise<T>
    {
        const resultPromise = this.executeInternal();

        this.executionHandler?.(resultPromise);

        return resultPromise;
    }
}
```

Key design point: `AsyncCommandImpl` does NOT know about the form. It accepts a generic `Func<Promise<T>>` — the execution function. When `executeAsync()` is called, it:
1. Calls the execution function to get a `Promise<T>`
2. Passes that promise to the execution handler (if set)
3. Returns the promise to the caller

This means the **modal** receives the promise via the execution handler and can await it to manage UI state (disable, loading, close).

### How Form Changes

```typescript
// Form gets a new method — it still extends UIElement (not ActionUIElement)
export abstract class Form<TEntity extends Record<string, any>> extends UIElement implements Destroyable
{
    // ... existing methods (including submitAsync()) ...
    
    abstract getSubmitCommand(): AsyncCommand<boolean>;
}
```

The `FormBase` implementation:
```typescript
class FormBase<TEntity> extends Form<TEntity>
{
    private submitCommand = new AsyncCommandImpl(() => this.submitAsyncInternal());
    
    getSubmitCommand(): AsyncCommand<boolean>
    {
        return this.submitCommand;
    }
    
    // submitAsync() stays and delegates to the command
    override async submitAsync(): Promise<void>
    {
        await this.submitCommand.executeAsync();
    }
}
```

### How ModalConfirm Changes

```typescript
export abstract class ModalConfirm<Content extends UIElement = UIElement> extends Modal<Content>
{
    // ... existing ...
    
    abstract setConfirmCommand(command: AsyncCommand<boolean>): void;
}
```

`ModalConfirmBase` implementation:
```typescript
class ModalConfirmBase<Content> extends ModalBase<Content> implements ModalConfirm<Content>
{
    private confirmCommand: AsyncCommand<boolean> | undefined;
    
    setConfirmCommand(command: AsyncCommand<boolean>): void
    {
        this.confirmCommand = command;
        
        command.setExecutionHandler(async (resultPromise) =>
        {
            this.isDisabled = true;
            this.buttonConfirm.isLoading = true;
            
            try
            {
                const result = await resultPromise;
                if (result)
                {
                    this.close();
                }
            }
            finally
            {
                this.isDisabled = false;
                this.buttonConfirm.isLoading = false;
            }
        });
    }
    
    protected handleConfirmButtonClick()
    {
        this.confirmCommand?.executeAsync();
    }
}
```

### How Use Cases Change

```typescript
// CreateToDoUseCaseImpl
execute(): void
{
    const todo = this.todosOwner.createToDo();
    const form = this.formFactory.create<ToDoData>();

    form.setSubmitHandler(async formData =>
    {
        updatePropertiesWithData(todo, formData);
        await todo.saveAsync();
    });

    form.setElementsFromScheme(todo.getAddScheme());
    form.setData(todo.getData());

    const modal = this.addFormModalUseCase.execute(form);
    modal.setConfirmCommand(form.getSubmitCommand());  // NEW: pass command explicitly
    modal.toAddMode();
}
```

---

## What Gets Removed

| File | Change |
|------|--------|
| `app/modules/uikit/entities/actionUIElement.ts` | **Delete** — no longer needed |
| `app/modules/uikit/entities/uiElementAction.ts` | **Delete** — replaced by `AsyncCommand` |
| `app/modules/uikit/entities/uiElementActionBase.ts` | **Delete** — replaced by `AsyncCommandImpl` |
| `app/modules/uikit/mocks/uiElementActionMock.ts` | **Delete** — no longer needed |
| `app/modules/forms/entities/form.ts` | Remove `extends ActionUIElement`, remove `action` abstract property, add `getSubmitCommand()` |
| `app/modules/forms/entities/formBase.ts` | Remove `action` field, add `submitCommand` + `getSubmitCommand()` |
| `app/modules/overlay/entities/modalConfirmBase.ts` | Remove `content.action` wiring, use `setConfirmCommand()` instead |
| `app/modules/overlay/factories/modalFactory.ts` | Remove `ActionUIElement` type constraint |

## What Gets Created

| File | Description |
|------|-------------|
| `app/modules/shared/types/asyncCommand.ts` | New `AsyncCommand<T>` abstract type |
| `app/modules/shared/types/asyncCommandImpl.ts` | Generic `AsyncCommandImpl<T>` implementation |

---

## Impact Analysis

### Files that change:
1. `app/modules/forms/entities/form.ts` — remove `ActionUIElement` inheritance, remove `action` abstract property, add `getSubmitCommand()`, keep `submitAsync()`
2. `app/modules/forms/entities/formBase.ts` — replace `action` field with `submitCommand` + `getSubmitCommand()`, `submitAsync()` delegates to command
3. `app/modules/overlay/entities/modalConfirm.ts` — add `setConfirmCommand(command: AsyncCommand<boolean>): void`
4. `app/modules/overlay/entities/modalConfirmBase.ts` — implement `setConfirmCommand()`, remove `content.action` wiring in content setter, update `handleConfirmButtonClick()`
5. `app/modules/overlay/factories/modalFactory.ts` — remove `ActionUIElement` constraint from `createModalConfirm`
6. `app/modules/todo/usecases/createToDoUseCaseImpl.ts` — add `modal.setConfirmCommand(form.getSubmitCommand())`
7. `app/modules/todo/usecases/editToDoUseCaseImpl.ts` — add `modal.setConfirmCommand(form.getSubmitCommand())`

### Files to delete:
1. `app/modules/uikit/entities/actionUIElement.ts`
2. `app/modules/uikit/entities/uiElementAction.ts`
3. `app/modules/uikit/entities/uiElementActionBase.ts`
4. `app/modules/uikit/mocks/uiElementActionMock.ts`

### Files to create:
1. `app/modules/shared/types/asyncCommand.ts`
2. `app/modules/shared/types/asyncCommandImpl.ts`

---

## Sequence Diagram: New Flow

```mermaid
sequenceDiagram
    participant UC as UseCase
    participant Form as FormBase
    participant Cmd as AsyncCommandImpl
    participant Modal as ModalConfirmBase
    participant Btn as Confirm Button

    UC->>Form: create()
    UC->>Form: setSubmitHandler(handler)
    UC->>Form: setElementsFromScheme(...)
    UC->>Form: setData(...)
    UC->>Modal: addFormModalUseCase.execute(form)
    UC->>Modal: setConfirmCommand(form.getSubmitCommand())
    Modal->>Cmd: setExecutionHandler(handler)
    UC->>Modal: toAddMode()

    Note over Btn,Modal: User clicks "Добавить"
    Btn->>Modal: click
    Modal->>Cmd: executeAsync()
    Cmd->>Form: submitAsyncInternal()
    Form->>Form: validate()
    Form->>Form: disable()
    Form->>Form: getData()
    Form->>Form: submitHandler(data)
    Form-->>Cmd: Promise<true>
    Cmd-->>Modal: handler(resultPromise)
    Modal->>Modal: isDisabled = true, loading
    Modal->>Modal: await resultPromise
    Note over Modal: result === true
    Modal->>Modal: close()
    Cmd-->>Modal: executeAsync() returns Promise<true>
    Note over Modal: (also returned to caller)

---

## Todo List

1. Create `app/modules/shared/types/asyncCommand.ts` — `AsyncCommand<T>` abstract type
2. Create `app/modules/shared/types/asyncCommandImpl.ts` — `AsyncCommandImpl<T>` generic implementation
3. Modify `app/modules/forms/entities/form.ts` — remove `ActionUIElement` inheritance, remove `action` abstract property, add `getSubmitCommand()`, keep `submitAsync()`
4. Modify `app/modules/forms/entities/formBase.ts` — replace `action` field with `submitCommand` + `getSubmitCommand()`, `submitAsync()` delegates to command
5. Modify `app/modules/overlay/entities/modalConfirm.ts` — add `setConfirmCommand(command: AsyncCommand<boolean>): void`
6. Modify `app/modules/overlay/entities/modalConfirmBase.ts` — implement `setConfirmCommand()`, remove `content.action` wiring, update `handleConfirmButtonClick()`
7. Modify `app/modules/overlay/factories/modalFactory.ts` — remove `ActionUIElement` constraint
8. Modify `app/modules/todo/usecases/createToDoUseCaseImpl.ts` — add `modal.setConfirmCommand(form.getSubmitCommand())`
9. Modify `app/modules/todo/usecases/editToDoUseCaseImpl.ts` — add `modal.setConfirmCommand(form.getSubmitCommand())`
10. Delete `app/modules/uikit/entities/actionUIElement.ts`
11. Delete `app/modules/uikit/entities/uiElementAction.ts`
12. Delete `app/modules/uikit/entities/uiElementActionBase.ts`
13. Delete `app/modules/uikit/mocks/uiElementActionMock.ts`
14. Verify no remaining references to deleted types