# @client/ui-overlay

> **Reactive overlay management library for Nuxt/Vue applications.**

Provides a unified abstraction for creating and managing transient UI elements (modals, dialogs, etc.) that float above the main application content.

## Overview

`@client/ui-overlay` implements an overlay container model: a single `Overlay` entity maintains an observable collection of overlay elements. Each element is backed by a viewmodel (`OverlayElementViewmodel`) that exposes reactive state for template binding. The top-level `OverlayViewmodel` aggregates element states and feeds them to a rendering widget.

Currently the only supported element type is **modal** (`OverlayElementType.modal`), but the architecture is extensible — new element types (toasts, popovers, drawers, etc.) can be added by introducing new `OverlayElementViewmodel` implementations and corresponding `OverlayElementType` values.

## Architecture

```
OverlayConfiguration / RenderableViewmodel   ← caller provides content + buttons
        │
        ▼
Overlay.createModal(configuration)           ← creates a ModalViewmodel, registers it
        │
        ▼
OverlayBase                                  ← observable collection of elements
        │
        ├─ ModalViewmodelsFactory            ← wires content, buttons, onClose callback
        │      └─ ModalButtonConfirmConfigurator  ← fluent button setup (create/edit)
        │
        ▼
OverlayViewmodelImpl                         ← aggregates element states → OverlayData
        │
        ▼
VOverlayWidget (Vue)                         ← renders elements by OverlayElementType
```

## Key Concepts

### Overlay

The `Overlay` abstract class is the root container. It exposes:

| Member | Description |
|---|---|
| `elements` | `ObservableReadonly` array of active `OverlayElementViewmodel`s |
| `createModal(configuration)` | Creates a modal from a `ModalConfiguration`, adds it to the collection, and returns the `ModalViewmodel` |
| `[Symbol.dispose]()` | Disposes the overlay and its observable collection |

`OverlayBase` is the default implementation. It accepts a `ModalViewmodelsFactory` and wires each created modal's `onClose` callback to remove it from the collection.

### OverlayViewmodel

`OverlayViewmodelImpl` wraps an `Overlay` and projects its element viewmodels into plain `OverlayElementsData[]` for template consumption:

```ts
const vm = new OverlayViewmodelImpl(overlay);

vm.state.value.elements; // readonly OverlayElementsData[]
```

It subscribes to the overlay's element collection and re-derives the aggregated state on every change.

### OverlayElementViewmodel

Each overlay element extends `OverlayElementViewmodel<TData>`, which adds a `close()` method on top of the base `Viewmodel` lifecycle. `OverlayElementViewmodelBase` implements `close()` by invoking the `onClose` callback and then disposing itself.

### ModalViewmodel

`ModalViewmodel<TContentData>` is the modal specialization of an overlay element. It exposes:

| Member | Description |
|---|---|
| `state` | Reactive `OverlayElementData<ModalDataFull>` — title, description, content, buttons, `isDisabled` |
| `enable()` | Re-enables the modal and its buttons |
| `disable()` | Disables the modal and its buttons (e.g. during submission) |
| `close()` | Inherited — triggers `onClose` and disposes |

### ModalConfiguration

A modal is created declaratively via `ModalConfiguration`:

```ts
type ModalConfiguration<TContentData> = {
    title: string;
    description?: string;
    content: RenderableViewmodel<TContentData>;
    buttonConfirm?: (configurator: ModalButtonConfirmConfigurator) => ButtonGeneralViewmodel;
    buttonCancel?: boolean;
};
```

### ModalButtonConfirmConfigurator

A fluent builder for the confirm button, provided to the `buttonConfirm` callback:

| Method | Description |
|---|---|
| `withCommand(command)` | Binds an `AsyncCommand` to the button |
| `asCreateButton()` | Applies "create" preset (primary color, `button.create` title) |
| `asEditButton()` | Applies "edit" preset (primary color, `button.save` title) |

Methods are chainable and return the configurator for fluent composition.

### Data Types

| Type | Description |
|---|---|
| `OverlayData` | Top-level state: `{ elements: readonly OverlayElementsData[] }` |
| `OverlayElementsData` | Discriminated union by `elementType` (currently only `modal`) |
| `ModalDataBase` | Full modal shape: title, description, content, buttons, `isInline`, `isDisabled` |
| `ModalDataPartial` | Partial variant used for Vue component props |
| `ModalDataFull` | Full modal data with resolved `ModalContentData` |
| `ModalContentData` | `{ renderKey: symbol; data: TData }` — identifies the content renderer |

## Package Structure

```
src/
├── entities/
│   ├── overlay.ts                          ← abstract overlay container
│   ├── overlayBase.ts                      ← default Overlay implementation
│   ├── modalButtonConfirmConfigurator.ts   ← abstract confirm-button builder
│   └── modalButtonConfirmConfiguratorBase.ts ← fluent builder implementation
├── enums/
│   └── overlayElementType.ts               ← OverlayElementType enum
├── factories/
│   ├── modalViewmodelsFactory.ts           ← abstract modal factory
│   └── modalViewmodelsFactoryImpl.ts       ← default factory implementation
├── types/
│   ├── modalContentData.ts                 ← content render-key + data
│   ├── modalDataBase.ts                    ← full modal data shape
│   ├── modalDataFull.ts                    ← resolved modal data
│   ├── modalDataPartial.ts                 ← partial modal data (props)
│   ├── overlayData.ts                      ← top-level overlay state
│   ├── overlayElementData.ts               ← generic element data wrapper
│   └── overlayElementsData.ts              ← discriminated element union
├── viewmodels/
│   ├── modalViewmodel.ts                   ← abstract modal viewmodel
│   ├── modalViewmodelImpl.ts               ← modal viewmodel implementation
│   ├── overlayElementViewmodel.ts          ← abstract element viewmodel
│   ├── overlayElementViewmodelBase.ts      ← base element viewmodel (close + dispose)
│   ├── overlayViewmodel.ts                 ← abstract overlay viewmodel
│   └── overlayViewmodelImpl.ts             ← overlay viewmodel implementation
└── index.ts                                ← public exports
```

## Dependencies

| Package | Purpose |
|---|---|
| `@client/ui-core` | `Viewmodel` / `ViewmodelBase` / `ObservableViewmodelStateBase` / `RenderableViewmodel` |
| `@client/ui-uikit` | `ButtonGeneralViewmodel` / `UIKitViewmodelsFactory` / `ButtonGeneralData` |
| `@client/ui-forms` | Form integration for modal content |
| `@client/shared` | `ObservableReadonly` / `ObservableArrayBase` / `AsyncCommand` / `Func` |
| `@client/infrastructure-di` | Dependency injection utilities |
| `@client/infrastructure-messages` | `MessageKey` for i18n button titles |

## Usage

### Wiring with DI

```ts
import { ServicesContainer } from '@client/infrastructure-di';
import { UIKitViewmodelsFactory, UIKitViewmodelsFactoryImpl } from '@client/ui-uikit';
import { Overlay, OverlayBase, OverlayViewmodel, OverlayViewmodelImpl } from '@client/ui-overlay';

const container = new ServicesContainer();

container.bind(Overlay).to(OverlayBase).asSingleton();
container.bind(OverlayViewmodel).to(OverlayViewmodelImpl).asTransient();
container.bind(UIKitViewmodelsFactory).to(UIKitViewmodelsFactoryImpl).asTransient();
```

### Creating a modal

```ts
import { Overlay, ModalButtonConfirmConfigurator } from '@client/ui-overlay';

const overlay = container.resolve(Overlay);

const modal = overlay.createModal({
    title: 'Create Todo',
    description: 'Fill in the details below',
    content: formViewmodel, // RenderableViewmodel
    buttonConfirm: (c: ModalButtonConfirmConfigurator) =>
        c.withCommand(submitCommand).asCreateButton(),
    buttonCancel: true,
});

// Disable during async operations
modal.disable();

// Re-enable
modal.enable();

// Close & dispose
modal.close();
```

### Rendering in Vue

```vue
<script setup lang="ts">
import { useService } from '../composables/useService';
import { OverlayViewmodel, OverlayElementType } from '@client/ui-overlay';
import { useViewmodel } from '../composables/useViewmodel';
import VModal from '../components/VModal.vue';
import { h, type VNode } from 'vue';

const viewmodel = useService(OverlayViewmodel);
const state = useViewmodel(viewmodel);

function getOverlayElementVNode(element: OverlayElementsData): VNode | undefined {
  switch (element.elementType) {
    case OverlayElementType.modal:
      return h(VModal, element);
    default:
      return undefined;
  }
}
</script>

<template>
  <component
    v-for="(element, index) in state.elements"
    :key="index"
    :is="getOverlayElementVNode(element)"
  />
</template>
```

## Testing

```bash
pnpm typecheck   # TypeScript type checking
```
