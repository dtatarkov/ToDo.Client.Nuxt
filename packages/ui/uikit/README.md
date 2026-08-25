# @client/ui-uikit

> **Reactive, type-safe UI primitives library for Nuxt/Vue applications.**

Provides viewmodels and data types for low-level UI controls — inputs (text, textarea, date, time, datetime, hidden), buttons (general, icon), and info blocks — along with a factory for creating them.

## Overview

`@client/ui-uikit` is the foundational UI building block package. Each control is represented by a viewmodel that exposes reactive state (`ObservableViewmodelStateBase`) for Vue template binding and a set of imperative methods for controlling behavior (enable/disable, error modes, value management, etc.). All viewmodels are created through a single `UIKitViewmodelsFactory`, enabling DI-based wiring and testability.

The package is consumed by higher-level packages (`@client/ui-forms`, `@client/ui-overlay`, `@client/ui-todo`) and rendered by Vue components in `@client/ui-vue`.

## Architecture

```
UIKitViewmodelsFactory                     ← single entry point for creating controls
        │
        ├─ createInput(type)               ← type-driven dispatch (throws UnknownInputTypeException)
        │   ├─ InputTextViewmodelImpl
        │   ├─ InputTextareaViewmodelImpl
        │   ├─ InputDateViewmodelImpl
        │   ├─ InputTimeViewmodelImpl
        │   ├─ InputDatetimeViewmodelImpl
        │   └─ InputHiddenViewmodelImpl
        │         │
        │         └─ all extend InputViewmodelImpl<V, TData>
        │                └─ EntityScheme-backed state validation
        │
        ├─ createButtonGeneral()           ← ButtonGeneralViewmodelImpl
        ├─ createButtonIcon()              ← ButtonIconViewmodelImpl
        │         │
        │         └─ both extend ButtonBaseViewmodelImpl<TData>
        │                ├─ AsyncCommand binding (click → executeAsync)
        │                └─ onClick event bus
        │
        └─ createInfoBlock()               ← InfoBlockViewmodelImpl
```

## Key Concepts

### InputType

An enum identifying all supported input types:

| Value | Description |
|---|---|
| `inputText` | Single-line text input |
| `inputTextarea` | Multi-line text input |
| `inputDate` | Date picker (`Date \| undefined`) |
| `inputTime` | Time picker (`number \| undefined`) |
| `inputDateTime` | Date+time picker (`Date \| undefined`) |
| `inputHidden` | Hidden carrier field (`any`) |

`inputTypeValues` is exported as a readonly array of all values for iteration/validation.

### InputViewmodel

The abstract base for all input controls, parameterized by value type `V` and data shape `TData`:

| Member | Description |
|---|---|
| `inputType` | The `InputType` enum value |
| `name` | Field name (for form submission) |
| `value` | Get/set the current value |
| `isDisabled` | Whether the input is disabled |
| `hasError` | Whether the input is in error state |
| `setData(data)` | Partial bulk update of the state |
| `disable()` / `enable()` | Toggle disabled state |
| `setDefaultValue()` | Reset value to type-specific default |
| `toErrorMode()` / `toDefaultMode()` | Toggle error highlight |

`InputViewmodelImpl` is the base implementation. Each concrete input defines its `EntityScheme` (for state validation and defaults), default value, and `InputType` via three abstract methods: `createScheme()`, `getDefaultValue()`, `getType()`.

### Input Variants

| Viewmodel | Value Type | Extra Data |
|---|---|---|
| `InputTextViewmodel` | `string` | `placeholderKey?: MessageKey` |
| `InputTextareaViewmodel` | `string` | `placeholderKey?: MessageKey` |
| `InputDateViewmodel` | `Date \| undefined` | — |
| `InputTimeViewmodel` | `number \| undefined` | — |
| `InputDatetimeViewmodel` | `Date \| undefined` | — |
| `InputHiddenViewmodel` | `any` | — |

Text and textarea inputs share `InputWithPlaceholderData` (`placeholderKey`), which is an i18n `MessageKey`.

### ButtonBaseViewmodel

The abstract base for all button controls:

| Member | Description |
|---|---|
| `getCommand()` / `setCommand(command)` | Bind an `AsyncCommand` (set-once; throws `InitializationOnlyException` on re-set) |
| `disable()` / `enable()` | Toggle disabled state |
| `click()` | Executes the bound command (`command.executeAsync()`) and emits the `onClick` event |
| `onClick(handler, disposeToken?)` | Subscribe to click events |

### ButtonGeneralViewmodel

A titled, colored button with a loading indicator:

| Member | Description |
|---|---|
| `setTitle(titleKey)` | Set the i18n title (`MessageKey \| undefined`) |
| `setColor(color)` | Set the button color (`Color` from `@client/ui-core`) |
| `showLoader()` / `hideLoader()` | Toggle `isLoading` state |

When an `AsyncCommand` is bound via `setCommand()`, the button automatically shows/hides the loader based on the command's `onExecuting` / `onIdle` events.

Default state: `titleKey: undefined`, `color: 'neutral'`, `isLoading: false`, `isDisabled: false`.

### ButtonIconViewmodel

An icon-only button:

| Member | Description |
|---|---|
| `setIcon(icon)` | Set the `Icon` (from `@client/shared`) |

### InfoBlockViewmodel

A read-only block of labeled rows, used for displaying detail information:

| Member | Description |
|---|---|
| `addRow(labelKey, content)` | Add a row with an i18n label and text content |
| `clear()` | Remove all rows |

State shape: `{ rows: InfoBlockViewmodelStateRow[]; hasRows: boolean }`.

### UIKitViewmodelsFactory

The central factory for creating all UI primitives. It provides both type-overloaded `createInput(type)` dispatch and dedicated `create*()` methods:

| Method | Returns |
|---|---|
| `createInput(type)` | `InputViewmodel<any>` — dispatches by `InputType` (throws `UnknownInputTypeException` on unknown) |
| `createInputText()` | `InputTextViewmodel` |
| `createTextarea()` | `InputTextareaViewmodel` |
| `createInputDate()` | `InputDateViewmodel` |
| `createInputTime()` | `InputTimeViewmodel` |
| `createInputDateTime()` | `InputDatetimeViewmodel` |
| `createInputHidden()` | `InputHiddenViewmodel` |
| `createInfoBlock()` | `InfoBlockViewmodel` |
| `createButtonGeneral()` | `ButtonGeneralViewmodel` |
| `createButtonIcon()` | `ButtonIconViewmodel` |

The `createInput(type)` method uses TypeScript overloads to return the correct concrete viewmodel type for each `InputType` value.

### Data Types

| Type | Description |
|---|---|
| `InputData<V>` | Base input shape: `id`, `name`, `value`, `hasAutofocus`, `isDisabled`, `hasError` |
| `InputTextData` | `InputData<string>` + `placeholderKey` |
| `InputTextareaData` | `InputData<string>` + `placeholderKey` |
| `InputDateData` | `InputData<Date \| undefined>` |
| `InputTimeData` | `InputData<number \| undefined>` |
| `InputDateTimeData` | `InputData<Date \| undefined>` |
| `InputHiddenData` | `InputData<any>` |
| `ButtonData` | Base button shape: `isDisabled` |
| `ButtonGeneralData` | `ButtonData` + `titleKey`, `color`, `isLoading` |
| `ButtonIconData` | `ButtonData` + `icon?` |

## Package Structure

```
src/
├── enums/
│   └── inputType.ts                       ← InputType enum + inputTypeValues
├── exceptions/
│   └── unknownInputTypeException.ts       ← thrown on unsupported InputType
├── factories/
│   ├── uiKitViewmodelsFactory.ts          ← abstract factory (overloaded createInput)
│   └── uiKitViewmodelsFactoryImpl.ts      ← default factory implementation
├── types/
│   ├── inputData.ts                       ← base input data shape
│   ├── inputWithPlaceholderData.ts        ← placeholderKey mixin
│   ├── inputTextData.ts                   ← text input data
│   ├── inputTextareaData.ts               ← textarea input data
│   ├── inputDateData.ts                   ← date input data
│   ├── inputTimeData.ts                   ← time input data
│   ├── inputDateTimeData.ts               ← datetime input data
│   ├── inputHiddenData.ts                 ← hidden input data
│   ├── buttonData.ts                      ← base button data shape
│   ├── buttonGeneralData.ts               ← general button data
│   └── buttonIconData.ts                  ← icon button data
├── viewmodels/
│   ├── inputViewmodel.ts                  ← abstract input base
│   ├── inputViewmodelImpl.ts              ← base input implementation (EntityScheme)
│   ├── inputTextViewmodel.ts / Impl.ts    ← text input
│   ├── inputTextareaViewmodel.ts / Impl.ts ← textarea input
│   ├── inputDateViewmodel.ts / Impl.ts    ← date input
│   ├── inputTimeViewmodel.ts / Impl.ts    ← time input
│   ├── inputDatetimeViewmodel.ts / Impl.ts ← datetime input
│   ├── inputHiddenViewmodel.ts / Impl.ts ← hidden input
│   ├── buttonBaseViewmodel.ts             ← abstract button base
│   ├── buttonBaseViewmodelImpl.ts         ← base button implementation
│   ├── buttonGeneralViewmodel.ts / Impl.ts ← general button
│   ├── buttonIconViewmodel.ts / Impl.ts   ← icon button
│   ├── infoBlockViewmodel.ts              ← abstract info block
│   └── infoBlockViewmodelImpl.ts          ← info block implementation
└── index.ts                               ← public exports
```

## Dependencies

| Package | Purpose |
|---|---|
| `@client/ui-core` | `Viewmodel` / `ViewmodelBase` / `ObservableViewmodelStateBase` / `Color` / `RenderableViewmodel` |
| `@client/shared` | `AsyncCommand` / `Action` / `DisposeToken` / `EntityEvent` / `Icon` / `InitializationOnlyException` |
| `@client/infrastructure-entity-schemes` | `EntityScheme` for input state validation & defaults |
| `@client/infrastructure-messages` | `MessageKey` / `messageKeyValues` for i18n titles & placeholders |
| `@client/infrastructure-di` | Dependency injection utilities |
| `@client/infrastructure-datetime` | Date/time utilities |
| `@client/domain-todo` | Domain types |

## Usage

### Wiring with DI

```ts
import { ServicesContainer } from '@client/infrastructure-di';
import { UIKitViewmodelsFactory, UIKitViewmodelsFactoryImpl } from '@client/ui-uikit';

const container = new ServicesContainer();

container.bind(UIKitViewmodelsFactory).to(UIKitViewmodelsFactoryImpl).asTransient();
```

### Creating inputs

```ts
import { UIKitViewmodelsFactory, InputType } from '@client/ui-uikit';

const factory = container.resolve(UIKitViewmodelsFactory);

// Type-driven dispatch
const input = factory.createInput(InputType.inputText);
input.setData({ name: 'title', placeholderKey: 'todo.title' });
input.value = 'My Todo';
input.disable();

// Or use the dedicated method (fully typed return)
const textarea = factory.createTextarea();
textarea.setData({ name: 'description' });
```

### Creating buttons

```ts
import { UIKitViewmodelsFactory } from '@client/ui-uikit';

const factory = container.resolve(UIKitViewmodelsFactory);

const button = factory.createButtonGeneral();
button.setTitle('button.save');
button.setColor('primary');
button.setCommand(submitCommand); // auto-shows loader during execution
button.onClick(() => console.log('clicked'));

// Icon button
const iconButton = factory.createButtonIcon();
iconButton.setIcon('i-lucide-trash');
iconButton.disable();
```

### Creating an info block

```ts
import { UIKitViewmodelsFactory } from '@client/ui-uikit';

const factory = container.resolve(UIKitViewmodelsFactory);

const info = factory.createInfoBlock();
info.addRow('todo.title', 'Buy groceries');
info.addRow('todo.priority', 'High');

// In a Vue template:
// <VInfoBlock v-bind="info.state.value" />
```

### Rendering in Vue

```vue
<!-- Input -->
<VInputText v-bind="input.state.value" v-model:value="input.value" />

<!-- Button -->
<VButtonGeneral
  v-bind="button.state.value"
  @click="button.click()"
/>
```

## Testing

```bash
pnpm typecheck   # TypeScript type checking
```
