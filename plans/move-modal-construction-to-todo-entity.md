# Refactoring Plan: Move Modal Construction from Use Cases to ToDo Entity

## Goal

Move the form+modal construction logic from `CreateToDoUseCaseImpl` and `EditToDoUseCaseImpl` into the `ToDo` entity itself, exposing a single parameterless `showForm(): Modal` method. The use cases will simply call `todo.showForm()`.

## Current Architecture

### CreateToDoUseCaseImpl.execute()
1. Creates a new todo via `todosOwner.createToDo()`
2. Creates a form via `formFactory.create()` with a submit callback
3. Sets form elements from `todo.getAddScheme()`
4. Sets form data from `todo.getData()`
5. Creates a modal via `overlay.createModal()` with title 'Создать задачу', `.asCreateButton()`

### EditToDoUseCaseImpl.executeAsync(id)
1. Fetches todo by id via `todosOwner.getToDoByIdAsync(id)`
2. Creates a form via `formFactory.create()` with a submit callback
3. Sets form elements from `todo.getEditScheme()`
4. Sets form data from `todo.getData()`
5. Creates a modal via `overlay.createModal()` with title 'Изменить задачу', `.asEditButton()`

## Target Architecture

### ToDo.showForm() — single parameterless method
- Uses `this.isNew` to determine add vs edit mode
- Internally calls private `showAddForm()` or `showEditForm()`
- Both private methods construct the form, set scheme+data, and create the modal
- Returns the created `Modal`

### CreateToDoUseCaseImpl.execute()
1. Creates a new todo via `todosOwner.createToDo()`
2. Calls `todo.showForm()`

### EditToDoUseCaseImpl.executeAsync(id)
1. Fetches todo by id via `todosOwner.getToDoByIdAsync(id)`
2. Calls `todo.showForm()`

## Changes Required

### 1. ToDo (abstract class) — [`app/modules/todo/entities/todo.ts`](app/modules/todo/entities/todo.ts)
- Add abstract method: `abstract showForm(): Modal`
- Add import for `Modal` from `@/modules/overlay/entities/modal`

### 2. ToDoBase (concrete class) — [`app/modules/todo/entities/todoBase.ts`](app/modules/todo/entities/todoBase.ts)
- Add `@dependency(Overlay)` and `@dependency(FormFactory)` decorators
- Add constructor parameters: `private overlay: Overlay`, `private formFactory: FormFactory`
- Implement `showForm()`:
  ```typescript
  override showForm(): Modal
  {
      return this.isNew
          ? this.showAddForm()
          : this.showEditForm();
  }
  ```
- Add private `showAddForm()` method (moves logic from `CreateToDoUseCaseImpl`)
- Add private `showEditForm()` method (moves logic from `EditToDoUseCaseImpl`)
- Both private methods:
  - Create form via `this.formFactory.create()` with submit callback that calls `updatePropertiesWithData(this, data)` then `this.saveAsync()`
  - Set elements from scheme (`getAddScheme()` / `getEditScheme()`)
  - Set data from `this.getData()`
  - Create and return modal via `this.overlay.createModal()`
- Add import for `FormFactory`, `Overlay`, `Modal`, `updatePropertiesWithData`

### 3. ToDoFactoryImpl — [`app/modules/todo/factories/todoFactoryImpl.ts`](app/modules/todo/factories/todoFactoryImpl.ts)
- Add `@dependency(Overlay)` and `@dependency(FormFactory)` decorators
- Add constructor parameters: `private overlay: Overlay`, `private formFactory: FormFactory`
- Pass `overlay` and `formFactory` to `new ToDoBase(overlay, formFactory)`
- Add imports for `Overlay`, `FormFactory`

### 4. CreateToDoUseCaseImpl — [`app/modules/todo/usecases/createToDoUseCaseImpl.ts`](app/modules/todo/usecases/createToDoUseCaseImpl.ts)
- Remove `@dependency(Overlay)` and `@dependency(FormFactory)` decorators
- Remove constructor params: `overlay`, `formFactory`
- Simplify `execute()` to just:
  ```typescript
  execute(): void
  {
      const todo = this.todosOwner.createToDo();
      todo.showForm();
  }
  ```
- Remove imports for `FormFactory`, `updatePropertiesWithData`, `Overlay`

### 5. EditToDoUseCaseImpl — [`app/modules/todo/usecases/editToDoUseCaseImpl.ts`](app/modules/todo/usecases/editToDoUseCaseImpl.ts)
- Remove `@dependency(Overlay)` and `@dependency(FormFactory)` decorators
- Remove constructor params: `overlay`, `formFactory`
- Simplify `executeAsync()` to just:
  ```typescript
  async executeAsync(id: string): Promise<void>
  {
      const todo = await this.todosOwner.getToDoByIdAsync(id);
      if (!todo) throw new ToDoNotFoundException(id);
      todo.showForm();
  }
  ```
- Remove imports for `FormFactory`, `updatePropertiesWithData`, `Overlay`

### 6. todoMock — [`app/modules/todo/mocks/todoMock.ts`](app/modules/todo/mocks/todoMock.ts)
- Add `showForm: vi.fn()` to the mock object

### 7. createToDoUseCaseImpl.test.ts — [`app/modules/todo/test/unit/createToDoUseCaseImpl.test.ts`](app/modules/todo/test/unit/createToDoUseCaseImpl.test.ts)
- Remove `formFactoryMock`, `formMock`, `overlayMock`, `modalMock` imports
- Remove `overlayMock` and `formFactoryMock` from constructor
- Update tests to verify `todo.showForm()` is called instead of form/modal creation

### 8. editToDoUseCaseImpl.test.ts — [`app/modules/todo/test/unit/editToDoUseCaseImpl.test.ts`](app/modules/todo/test/unit/editToDoUseCaseImpl.test.ts)
- Remove `formFactoryMock`, `formMock`, `overlayMock`, `modalMock` imports
- Remove `overlayMock` and `formFactoryMock` from constructor
- Update tests to verify `todo.showForm()` is called instead of form/modal creation

### 9. todoImpl.test.ts — [`app/modules/todo/test/unit/todoImpl.test.ts`](app/modules/todo/test/unit/todoImpl.test.ts)
- Add tests for `showForm()` that verify **observable behavior** (since `showAddForm()`/`showEditForm()` are private):
  - Should create form via `formFactory.create()` with a submit callback
  - Should set form elements from `getAddScheme()` when `isNew` is true
  - Should set form elements from `getEditScheme()` when `isNew` is false
  - Should set form data from `todo.getData()`
  - Should create modal via `overlay.createModal()` with correct title and button configurator
  - Should return a `Modal` instance
  - Submit callback should call `updatePropertiesWithData(todo, data)` and `todo.saveAsync()`
- Add imports for `formFactoryMock`, `formMock`, `overlayMock`, `modalMock`
- Create `ToDoBase` instance with mocked `Overlay` and `FormFactory`

## Dependency Injection Chain

```
ToDoFactoryImpl
  └─ @dependency(Overlay)
  └─ @dependency(FormFactory)
  └─ creates ToDoBase(overlay, formFactory)

ToDoBase
  └─ @dependency(Overlay)
  └─ @dependency(FormFactory)
  └─ showForm() → uses overlay.createModal() + formFactory.create()

CreateToDoUseCaseImpl
  └─ @dependency(ToDosOwner)  ← unchanged
  └─ execute() → todosOwner.createToDo().showForm()

EditToDoUseCaseImpl
  └─ @dependency(ToDosOwner)  ← unchanged
  └─ executeAsync(id) → todosOwner.getToDoByIdAsync(id) → todo.showForm()
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant UseCase as CreateToDoUseCaseImpl
    participant Owner as ToDosOwner
    participant Todo as ToDoBase
    participant FormFactory as FormFactory
    participant Form as Form
    participant Overlay as Overlay

    UseCase->>Owner: createToDo()
    Owner->>Todo: new ToDoBase(overlay, formFactory)
    Owner-->>UseCase: todo
    UseCase->>Todo: showForm()
    
    alt isNew == true
        Todo->>Todo: showAddForm()
        Todo->>FormFactory: create(submitCallback)
        FormFactory-->>Todo: form
        Todo->>Todo: getAddScheme()
        Todo->>Form: setElementsFromScheme(addScheme)
        Todo->>Todo: getData()
        Todo->>Form: setData(data)
        Todo->>Overlay: createModal(title='Создать задачу', asCreateButton)
        Overlay-->>Todo: modal
    else isNew == false
        Todo->>Todo: showEditForm()
        Todo->>FormFactory: create(submitCallback)
        FormFactory-->>Todo: form
        Todo->>Todo: getEditScheme()
        Todo->>Form: setElementsFromScheme(editScheme)
        Todo->>Todo: getData()
        Todo->>Form: setData(data)
        Todo->>Overlay: createModal(title='Изменить задачу', asEditButton)
        Overlay-->>Todo: modal
    end
    
    Todo-->>UseCase: modal