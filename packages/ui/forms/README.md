# @client/ui-forms

> **Type-safe, entity-driven form management library for Nuxt/Vue applications.**

Provides a complete abstraction for building, validating, and submitting forms backed by domain entities and Zod-based entity schemes.

## Overview

`@client/ui-forms` implements a factory-based form architecture where forms are defined declaratively through a `FormConfiguration` and instantiated via `FormViewmodelFactory`. The resulting viewmodel manages form state, element viewmodels, validation, locking, and async submission — all with full TypeScript generic safety.

## Architecture

```
FormConfiguration<TEntity>          ← declarative field definitions + optional EntityScheme
        │
        ▼
FormViewmodelFactoryImpl.create()   ← factory: wires configuration + handlers
        │
        ▼
FormViewmodelImpl<TEntity>          ← runtime: state, validation, submission, events
        │
        ├─ FormDataContext          ← reads/writes field values
        ├─ FormLock                ← disables/enables fields and the whole form
        ├─ FormValidator           ← validates data against EntityScheme
        ├─ FormEvents              ← emits validation error events
        └─ AsyncCommandFormSubmit  ← orchestrates lock → validate → submit pipeline
```

## Key Concepts

### FormConfiguration

A `FormConfiguration<TEntity>` ties each property of a domain entity `TEntity` to a `FormElementCreateData` (defining `inputType`, `label`, `placeholder`, etc.) and optionally an `EntityScheme` for validation:

```ts
const config = new FormConfiguration<MyEntity>({
    title: { inputType: InputType.inputText, label: 'Title' },
    description: { inputType: InputType.inputTextarea, label: 'Description' },
    priority: { inputType: InputType.inputSelect, label: 'Priority' },
    createdAt: { inputType: InputType.inputHidden }, // hidden carrier
}, myEntityScheme);

const data = config.toData({ values: { title: 'New Todo' } });
```

The `toData()` method converts the configuration into `FormDataPartial`, populating values and errors.

### FormViewmodel

The viewmodel is the central runtime object. It exposes:

| Member | Description |
|---|---|
| `getData()` | Returns a `Record<keyof TEntity, any>` with current field values |
| `setData(change)` | Partially updates field values (respects lock state) |
| `getSubmitCommand()` | Returns an `AsyncCommand` ready to bind to a UI submit button |
| `submitAsync()` | Executes the full submission pipeline |
| `onValidationError(handler)` | Subscribes to validation error events |
| `state` | Reactive state (`elements`, `isDisabled`) for Vue template binding |

### FormElementViewmodel

Each form field is represented by a `FormElementViewmodel` with its own reactive state (`value`, `errorKey`, `hasError`, `isDisabled`, `label`). The `FormElementViewmodelsFactory` creates these from `FormElementData`.

### Submission Pipeline

`AsyncCommandFormSubmit` orchestrates a deterministic pipeline:

1. **Lock** — disables all fields to prevent concurrent edits
2. **Validate** — runs `EntityScheme` validation; emits errors via `formValidationErrorEvent`
3. **Submit** — calls the user-provided `handlers.submit(data)` callback
4. **Unlock** — re-enables fields on completion (success or failure)

## Package Structure

```
src/
├── commands/
│   └── asyncCommandFormSubmit.ts    ← submission orchestration
├── configuration/
│   └── formConfiguration.ts         ← declarative form definition
├── entities/
│   ├── formDataContext*.ts          ← field value management
│   ├── formEvents*.ts               ← validation event bus
│   ├── formField*.ts                ← field abstraction
│   ├── formLock*.ts                 ← field/form locking
│   └── formValidator*.ts            ← EntityScheme-based validation
├── exceptions/
│   └── formDisabledException.ts     ← thrown when operations on locked form
├── factories/
│   ├── formElementViewmodelsFactory*.ts  ← creates element viewmodels
│   └── formViewmodelFactory*.ts          ← creates form viewmodels
├── types/
│   ├── formElementData*.ts          ← element data shapes
│   ├── formData*.ts                 ← form-level data shapes
│   ├── formHandlers.ts              ← submit handler signature
│   └── formValidationMessages.ts    ← typed validation error map
├── viewmodels/
│   ├── formElementViewmodel*.ts     ← per-field reactive state
│   └── formViewmodel*.ts            ← top-level form state & API
└── index.ts                         ← public exports
```

## Dependencies

| Package | Purpose |
|---|---|
| `@client/domain-todo` | Domain types |
| `@client/ui-core` | Base `Viewmodel` / `ViewmodelBase` |
| `@client/ui-uikit` | `InputType` enum |
| `@client/infrastructure-di` | Dependency injection utilities |
| `@client/infrastructure-entity-schemes` | `EntityScheme` for validation |
| `@client/infrastructure-messages` | `MessageKey` for i18n error messages |
| `@client/infrastructure-validation` | Validation utilities |
| `@client/shared` | `AsyncCommand`, `DisposeToken`, `onMany`, etc. |

## Usage

```ts
import { FormViewmodelFactoryImpl, FormConfiguration } from '@client/ui-forms';
import { InputType } from '@client/ui-uikit';

const factory = new FormViewmodelFactoryImpl();

const config = new FormConfiguration<Todo>({
    title: { inputType: InputType.inputText, label: 'Title' },
    done: { inputType: InputType.inputCheckbox, label: 'Done' },
}, todoEntityScheme);

const form = factory.create(config, {
    submit: async (data: Partial<Todo>) => {
        await api.createTodo(data);
    },
});

// In a Vue component:
// <form @submit.prevent="form.submitAsync()">
//   <UFormElement v-for="el in form.state.value.elements" :key="el.name" :data="el" />
//   <UButton :command="form.getSubmitCommand()" />
// </form>
```

## Testing

```bash
pnpm typecheck   # TypeScript type checking
pnpm vitest       # unit tests
```
