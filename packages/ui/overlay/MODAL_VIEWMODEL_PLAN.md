# ModalViewmodel Implementation Plan

## Goal

Add `ModalViewmodel` to `@client/ui-overlay` package, migrating the existing `Modal`/`ModalBase` prototype (from `apps/client/app/modules/overlay/entities/`) to a viewmodel-based architecture.

### Key differences from the prototype (`Modal`/`ModalBase`)

| Aspect | Prototype (`Modal`/`ModalBase`) | New (`ModalViewmodel`) |
|---|---|---|
| Content type | `UIElement` (Vue-based, has `vnode`) | `Viewmodel<TState>` (reactive state only) |
| Base class | `OverlayElementBase` | `ViewmodelBase<TState>` |
| Button type | `ButtonGeneral` (UIElement) | `ButtonGeneralViewmodel` (from `@client/ui-uikit`) |
| Construction | `ModalBase` constructor with `ButtonsFactory` | `ModalViewmodelsFactory.create(configuration)` |
| Button configurator | `ModalButtonConfirmConfigurator` → `ButtonGeneral` | `ModalButtonConfirmConfigurator` → `ButtonGeneralViewmodel` |
| Pattern | `ModalConfiguration` passed to constructor | Factory + `ModalConfiguration` properties object (same shape, explicit `create()` call) |

---

## Package Setup (prerequisite, done before stage 1)

### `package.json` — add dependencies

```jsonc
{
  "devDependencies": {
    "@client/ui-core": "workspace:*",
    "@client/ui-uikit": "workspace:*",
    "@client/shared": "workspace:*",
    "@client/infrastructure-di": "workspace:*",
    "@client/infrastructure-messages": "workspace:*",
    "@client/infrastructure-eslint": "workspace:*"
  },
  "scripts": {
    "typecheck": "tsc"
  }
}
```

### `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts', 'test/**/*.spec.ts'],
    environment: 'node',
    globals: true,
  },
});
```

---

## Stage 1 — Interfaces / API Spec

> **Deliverable:** `test/spec/modalViewmodel.spec.ts` — a spec file (like `todoForm.spec.ts`) that demonstrates the full Modal construction API in one place. No implementation yet — just the public API surface compiled against types.

### New files

#### `src/types/modalData.ts` (extended)

```ts
import type { ButtonGeneralData } from '@client/ui-uikit';

export type ModalData = {
    title: string;
    description: string;
    isDisabled: boolean;
    buttonConfirm: ButtonGeneralData | undefined;
    buttonCancel: ButtonGeneralData | undefined;
};
```

#### `src/types/modalConfiguration.ts`

```ts
import type { Viewmodel } from '@client/ui-core';
import type { Func } from '@client/shared';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';
import type { ModalButtonConfirmConfigurator } from '../configuration/modalButtonConfirmConfigurator';

export type ModalConfiguration<TContent extends Viewmodel<any> = Viewmodel<any>> = {
    title: string;
    description?: string;
    content: TContent;
    buttonConfirm?: Func<ButtonGeneralViewmodel, [ModalButtonConfirmConfigurator]>;
    buttonCancel?: boolean;
};
```

> Converts the prototype's builder-style, method-chained configuration into a plain properties object: `{ title, description, content, buttonConfirm, buttonCancel }`.

#### `src/viewmodels/modalViewmodel.ts`

```ts
import { Viewmodel } from '@client/ui-core';
import type { ModalData } from '../types/modalData';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';

export abstract class ModalViewmodel<TContent extends Viewmodel<any> = Viewmodel<any>>
    extends Viewmodel<ModalData>
{
    abstract readonly content: TContent;
    abstract readonly buttonConfirmViewmodel: ButtonGeneralViewmodel | undefined;
    abstract readonly buttonCancelViewmodel: ButtonGeneralViewmodel | undefined;

    abstract enable(): void;
    abstract disable(): void;
}
```

#### `src/configuration/modalButtonConfirmConfigurator.ts`

```ts
import type { AsyncCommand } from '@client/shared';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';

export abstract class ModalButtonConfirmConfigurator
{
    abstract withCommand(command: AsyncCommand): ModalButtonConfirmConfigurator;
    abstract asCreateButton(): ButtonGeneralViewmodel;
    abstract asEditButton(): ButtonGeneralViewmodel;
}
```

#### `src/factories/modalViewmodelsFactory.ts`

```ts
import type { Viewmodel } from '@client/ui-core';
import type { ModalViewmodel } from '../viewmodels/modalViewmodel';
import type { ModalConfiguration } from '../types/modalConfiguration';

export abstract class ModalViewmodelsFactory
{
    abstract create<TContent extends Viewmodel<any> = Viewmodel<any>>(
        configuration: ModalConfiguration<TContent>
    ): ModalViewmodel<TContent>;
}
```

> **Note:** `create` is generic — it preserves the content viewmodel type (`TContent`) through construction and into the returned `ModalViewmodel<TContent>`.

#### `src/index.ts` (updated exports)

```ts
export type { ModalData } from './types/modalData';
export type { ModalConfiguration } from './types/modalConfiguration';

export { ModalViewmodel } from './viewmodels/modalViewmodel';
export { ModalButtonConfirmConfigurator } from './configuration/modalButtonConfirmConfigurator';
export { ModalViewmodelsFactory } from './factories/modalViewmodelsFactory';
```

#### `test/spec/modalViewmodel.spec.ts`

A spec file demonstrating the full API:

```ts
import { it } from 'vitest';
import { ModalViewmodelsFactoryImpl } from '../../src/factories/modalViewmodelsFactoryImpl';
import { UIKitViewmodelsFactoryImpl } from '@client/ui-uikit';
import { FormViewmodelFactoryImpl, FormElementViewmodelsFactoryImpl, FormConfiguration } from '@client/ui-forms';
import { AsyncCommandGeneric } from '@client/shared';
import { MessagesServiceImpl } from '@client/infrastructure-messages';
import { InputType } from '@client/ui-uikit';

it('modal example', async () =>
{
    const uikitFactory = new UIKitViewmodelsFactoryImpl();
    const messagesService = new MessagesServiceImpl();

    // Content: a form viewmodel
    const formFactory = new FormViewmodelFactoryImpl(
        new FormElementViewmodelsFactoryImpl(uikitFactory)
    );

    const form = formFactory.create(
        new FormConfiguration<{ title: string }>({
            title: { inputType: InputType.inputText, labelKey: 'todo.field.title.label' },
        }),
        { submit: async () => {} }
    );

    // Modal via factory + configuration object
    const modal = new ModalViewmodelsFactoryImpl(uikitFactory, messagesService)
        .create({
            title: 'todo.modal.create.title',
            description: '...',
            content: form,
            buttonConfirm: configurator =>
                configurator
                    .withCommand(new AsyncCommandGeneric(async () => {}))
                    .asCreateButton(),
            buttonCancel: true,
        });

    // State access
    expect(modal.state.value.title).toBe('todo.modal.create.title');
    expect(modal.state.value.buttonConfirm).toBeDefined();
    expect(modal.state.value.buttonCancel).toBeDefined();
    expect(modal.state.value.isDisabled).toBe(false);

    // Content access
    expect(modal.content).toBe(form);
});
```

### Stage 1 checklist

- [ ] `src/types/modalData.ts` (extended with button states)
- [ ] `src/types/modalConfiguration.ts`
- [ ] `src/viewmodels/modalViewmodel.ts` (abstract)
- [ ] `src/configuration/modalButtonConfirmConfigurator.ts` (abstract)
- [ ] `src/factories/modalViewmodelsFactory.ts` (abstract)
- [ ] `src/index.ts` updated
- [ ] `test/spec/modalViewmodel.spec.ts`
- [ ] `package.json` updated with deps + scripts
- [ ] `vitest.config.ts` created
- [ ] Typecheck passes (`tsc --noEmit`)

---

## Stage 2 — Unit Tests

> **Deliverable:** `test/unit/modalViewmodelImpl.test.ts` + `test/unit/modalViewmodelsFactoryImpl.test.ts` + mocks. Tests written against the abstract interfaces, using real `ButtonGeneralViewmodelImpl` where practical and mocks for `UIKitViewmodelsFactory` / `MessagesService`.

### New files

#### `test/mocks/modalButtonConfirmConfiguratorMock.ts`

Mock for `ModalButtonConfirmConfigurator` — returns a mock `ButtonGeneralViewmodel`.

#### `test/mocks/modalViewmodelMock.ts`

Mock for `ModalViewmodel` — satisfies the abstract interface with `vi.fn()` stubs.

#### `test/unit/modalViewmodelsFactoryImpl.test.ts`

Tests for the factory:

```
describe('ModalViewmodelsFactoryImpl')
  describe('create')
    ✓ should create modal with title and content
    ✓ should create modal with description
    ✓ should create modal with buttonConfirm (configurator fn invoked)
    ✓ should create modal with buttonCancel
    ✓ should create modal with all fields
    ✓ should not create buttonConfirm when buttonConfirm omitted
    ✓ should not create buttonCancel when buttonCancel omitted
```

#### `test/unit/modalViewmodelImpl.test.ts`

Tests for the viewmodel:

```
describe('ModalViewmodelImpl')
  describe('state')
    ✓ should have provided title
    ✓ should have provided description
    ✓ should have provided content state
    ✓ should have provided buttonConfirm state
    ✓ should have provided buttonCancel state
    ✓ should not have buttonConfirm state when buttonConfirm is not provided
    ✓ should not have buttonCancel state when buttonCancel is not provided
    ✓ should not be disabled by default

  describe('content')
    ✓ should expose content viewmodel

  describe('buttonConfirmViewmodel')
    ✓ should be undefined when not provided
    ✓ should be the provided ButtonGeneralViewmodel when provided

  describe('buttonCancelViewmodel')
    ✓ should be undefined when not provided
    ✓ should be the provided ButtonGeneralViewmodel when provided

  describe('enable')
    ✓ should set isDisabled to false
    ✓ should enable buttonConfirmViewmodel if present
    ✓ should enable buttonCancelViewmodel if present

  describe('disable')
    ✓ should set isDisabled to true
    ✓ should disable buttonConfirmViewmodel if present
    ✓ should disable buttonCancelViewmodel if present

  describe('dispose')
    ✓ should dispose content viewmodel
    ✓ should dispose buttonConfirmViewmodel if present
    ✓ should dispose buttonCancelViewmodel if present
```

### Stage 2 checklist

- [ ] `test/mocks/modalButtonConfirmConfiguratorMock.ts`
- [ ] `test/mocks/modalViewmodelMock.ts`
- [ ] `test/unit/modalViewmodelsFactoryImpl.test.ts`
- [ ] `test/unit/modalViewmodelImpl.test.ts`
- [ ] Tests compile (against abstract types from stage 1)
- [ ] Tests fail as expected (no implementation yet)

---

## Stage 3 — Implementation (adapted to manual changes)

> **Deliverable:** All concrete implementations making tests pass.

### Manual changes made by user (must be respected)

1. **`ModalData<TContentData>`** — now generic over content data:
   ```ts
   export type ModalData<TContentData> = {
       title: string;
       description: string;
       content: TContentData;
       buttonConfirm: ButtonGeneralData | undefined;
       buttonCancel: ButtonGeneralData | undefined;
       isDisabled: boolean;
   };
   ```
   Content state is now **embedded in modal state** (`state.value.content`), not exposed via `modal.content` property.

2. **`ModalViewmodel<TContentData>`** — generic parameter is now **content data type**, not content viewmodel:
   ```ts
   export abstract class ModalViewmodel<TContentData>
       extends Viewmodel<ModalData<TContentData>>
   {
       abstract enable(): void;
       abstract disable(): void;
   }
   ```
   No `content` / `buttonConfirmViewmodel` / `buttonCancelViewmodel` abstract members anymore.

3. **`ModalViewmodelOptions<TContentData>`** — new options object for the viewmodel constructor:
   ```ts
   export type ModalViewmodelOptions<TContentData extends Record<string, any>> = {
       content: Viewmodel<TContentData>;
       title?: string;
       description?: string;
       buttonConfirm?: ButtonGeneralViewmodel;
       buttonCancel?: ButtonGeneralViewmodel;
   };
   ```

4. **`ModalViewmodelImpl<TContentData>`** — constructor now takes a single `options` object:
   ```ts
   export class ModalViewmodelImpl<TContentData extends Record<string, any>>
       extends ViewmodelBase<ModalData<TContentData>>
       implements ModalViewmodel<TContentData>
   {
       state: ObservableViewmodelStateBase<ModalData<TContentData>>;

       constructor(options: ModalViewmodelOptions<TContentData>) { ... }
   }
   ```
   State initialization (already in stub):
   ```ts
   this.state = new ObservableViewmodelStateBase<ModalData<TContentData>>({
       title: options.title ?? '',
       description: options.description ?? '',
       content: options.content.state.value,
       buttonConfirm: options.buttonConfirm?.state.value,
       buttonCancel: options.buttonCancel?.state.value,
       isDisabled: false,
   });
   ```

5. **Tests updated** — factory tests now assert `modal.content` / `modal.buttonConfirm` / `modal.buttonCancel` (properties that no longer exist on the abstract type). **This is a typecheck error that must be resolved in Stage 3.**

### New files

#### `src/viewmodels/modalViewmodelImpl.ts` (replace stub)

```ts
export class ModalViewmodelImpl<TContentData extends Record<string, any>>
    extends ViewmodelBase<ModalData<TContentData>>
    implements ModalViewmodel<TContentData>
```

Responsibilities:
- Constructor takes `options: ModalViewmodelOptions<TContentData>`
- Initialize `ObservableViewmodelStateBase<ModalData<TContentData>>` with:
  - `title: options.title ?? ''`
  - `description: options.description ?? ''`
  - `content: options.content.state.value`
  - `buttonConfirm: options.buttonConfirm?.state.value`
  - `buttonCancel: options.buttonCancel?.state.value`
  - `isDisabled: false`
- `enable()` / `disable()` — toggle `isDisabled` and propagate to both button viewmodels
- `[Symbol.dispose]()` — dispose content (if disposable), both button viewmodels, and state
- **Track aggregated states via inline `on()` calls** (separate per source, no single `watchButtons`):
  ```ts
  this.content.state.on(() => this.updateContentState(), this.disposeToken);
  this.buttonConfirm?.state.on(() => this.updateButtonConfirmState(), this.disposeToken);
  this.buttonCancel?.state.on(() => this.updateButtonCancelState(), this.disposeToken);
  ```
- Private update functions (one per aggregated source):
  ```ts
  private updateContentState()
  {
      this.state.update({ content: this.content.state.value });
  }

  private updateButtonConfirmState()
  {
      this.state.update({ buttonConfirm: this.buttonConfirm?.state.value });
  }

  private updateButtonCancelState()
  {
      this.state.update({ buttonCancel: this.buttonCancel?.state.value });
  }
  ```

#### `src/configuration/modalButtonConfirmConfiguratorBase.ts` (internal)

```ts
export class ModalButtonConfirmConfiguratorBase extends ModalButtonConfirmConfigurator
```

Constructor accepts:
- `button: ButtonGeneralViewmodel`
- `messagesService: MessagesService`

Methods:
- `withCommand(command)` — calls `button.setCommand(command)`, returns `this`
- `asCreateButton()` — sets color to `'primary'`, title to `messagesService.getMessage('button.create')`, returns button
- `asEditButton()` — sets color to `'primary'`, title to `messagesService.getMessage('button.save')`, returns button

> **Internal:** `ModalButtonConfirmConfiguratorBase` is an implementation detail — **not exported** from `src/index.ts`. Only the abstract `ModalButtonConfirmConfigurator` is public.

#### `src/factories/modalViewmodelsFactoryImpl.ts` (replace stub)

```ts
export class ModalViewmodelsFactoryImpl extends ModalViewmodelsFactory
```

Constructor accepts:
- `uikitFactory: UIKitViewmodelsFactory`
- `messagesService: MessagesService`

`create<TContent extends Viewmodel<any> = Viewmodel<any>>(configuration: ModalConfiguration<TContent>)`:
1. Create `buttonConfirmViewmodel` — if `configuration.buttonConfirm` provided:
   - Create `ButtonGeneralViewmodel` via `uikitFactory.createButtonGeneral()`
   - Create `ModalButtonConfirmConfiguratorBase` with the button + messagesService
   - Call `configuration.buttonConfirm(configurator)`, get back the configured button
2. Create `buttonCancelViewmodel` — if `configuration.buttonCancel === true`:
   - Create `ButtonGeneralViewmodel` via `uikitFactory.createButtonGeneral()`
   - Set title to `messagesService.getMessage('button.cancel')`
3. Return `new ModalViewmodelImpl({
       content: configuration.content,
       title: configuration.title,
       description: configuration.description,
       buttonConfirm: buttonConfirmViewmodel,
       buttonCancel: buttonCancelViewmodel,
   })`

#### `src/index.ts` (final exports)

```ts
export type { ModalData } from './types/modalData';
export type { ModalConfiguration } from './types/modalConfiguration';
export type { ModalViewmodelOptions } from './types/modalViewmodelOptions';

export { ModalViewmodel } from './viewmodels/modalViewmodel';
export { ModalViewmodelImpl } from './viewmodels/modalViewmodelImpl';

export { ModalButtonConfirmConfigurator } from './configuration/modalButtonConfirmConfigurator';
// ModalButtonConfirmConfiguratorBase is internal — NOT exported

export { ModalViewmodelsFactory } from './factories/modalViewmodelsFactory';
export { ModalViewmodelsFactoryImpl } from './factories/modalViewmodelsFactoryImpl';
```

### Typecheck fixes required (from user's test changes)

The factory tests reference `modal.content`, `modal.buttonConfirm`, `modal.buttonCancel` — these no longer exist on `ModalViewmodel<TContentData>`. Options:

- **A (recommended):** Add these as **concrete members on `ModalViewmodelImpl`** (not on the abstract `ModalViewmodel`):
  ```ts
  readonly content: Viewmodel<TContentData>;
  readonly buttonConfirmViewmodel: ButtonGeneralViewmodel | undefined;
  readonly buttonCancelViewmodel: ButtonGeneralViewmodel | undefined;
  ```
  Tests use `factory.create(...)` which returns `ModalViewmodel<TContent>` (abstract) — so this alone won't fix the typecheck. The factory's return type would need to be `ModalViewmodelImpl<TContent>` or tests need a cast.

- **B:** Update the factory tests to assert against `modal.state.value.content` / `modal.state.value.buttonConfirm` / `modal.state.value.buttonCancel` instead of `modal.content` / `modal.buttonConfirm` / `modal.buttonCancel`. This aligns with the new design where content/buttons live in state.

> **Decision needed:** The plan recommends **B** (align tests with new state-based design), but since Stage 2 is frozen, this requires user approval. If the user prefers keeping `modal.content` / `modal.buttonConfirm` / `modal.buttonCancel` accessors, option **A** with a return-type change on the factory is needed.

### Stage 3 checklist

- [ ] `src/viewmodels/modalViewmodelImpl.ts` (replace stub — real implementation)
- [ ] `src/configuration/modalButtonConfirmConfiguratorBase.ts` (internal, not exported)
- [ ] `src/factories/modalViewmodelsFactoryImpl.ts` (replace stub — real implementation)
- [ ] `src/index.ts` updated with all exports (no `ModalButtonConfirmConfiguratorBase`)
- [ ] All unit tests pass
- [ ] Spec file passes
- [ ] Typecheck passes (`tsc --noEmit`)

---

## Execution Rules

- **No implementation before permission.** Each stage requires explicit user approval before proceeding.
- **Stage 1** produces only abstract types, interfaces, and the spec file. The spec will not run successfully (no impl), but must typecheck.
- **Stage 2** produces test files and mocks. Tests will fail (no impl), but must compile.
- **Stage 3** produces concrete implementations. All tests must pass.