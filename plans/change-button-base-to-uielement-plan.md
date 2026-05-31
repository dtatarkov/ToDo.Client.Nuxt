# Plan: Change Button Base Class from Viewmodel to UIElement

## Overview

Change the `Button` abstract class (and its entire hierarchy) to extend `UIElement` instead of `Viewmodel<string>`. This aligns buttons with the rest of the UI element architecture (forms, overlays) which already use `UIElement` as their base.

## Key Differences Between Viewmodel and UIElement

| Aspect | Viewmodel | UIElement |
|--------|-----------|-----------|
| `key` | `readonly key: Key` (generic) | `key: string` (non-readonly) |
| Rendering | `readonly component: VComponent` (object with `setup()` returning render function) | `get vnode(): VNode` (getter returning a VNode directly) |

## Inheritance Chain

```
UIElement (abstract)
  └── Button (abstract)              ← currently extends Viewmodel<string>
        └── ButtonBase (abstract)
              ├── ButtonGeneralBase (concrete)
              └── ButtonIconBase (concrete)
```

## Files to Modify

### 1. `app/modules/uikit/entities/buttons/button.ts`
- Change `extends Viewmodel<string>` to `extends UIElement`
- Remove `import { Viewmodel }` from `../../interfaces/viewmodel`
- Add `import { UIElement }` from `../../interfaces/uiElement`
- No need to add `vnode` declaration — it's inherited from `UIElement`
- Keep all existing abstract members (`isDisabled`, `setClickHandler`)

### 2. `app/modules/uikit/entities/buttons/buttonBase.ts`
- No changes needed — `clickHandler` and `setClickHandler` remain as-is

### 3. `app/modules/uikit/entities/buttons/buttonGeneralBase.ts`
- Convert `data` from `ObservableSource` to `shallowReactive` (import from `vue`)
- Remove `import { ObservableSource }` and `import { useObservable }` (no longer needed)
- Remove the `component` property entirely
- Add a private `onClickFn` arrow function property with multiline body:
  ```ts
  private onClickFn = () =>
  {
      this.clickHandler.handle();
  };
  ```
- Add `get vnode(): VNode` that returns `h(VButtonGeneral, { ...this.data, onClick: this.onClickFn })`
- Change `readonly key` to non-readonly `key` (to match UIElement interface)
- Update getters/setters to use `this.data.title` directly (not `this.data.value.title`)

### 4. `app/modules/uikit/entities/buttons/buttonIconBase.ts`
- Same pattern as ButtonGeneralBase:
- Convert `data` from `ObservableSource` to `shallowReactive`
- Remove `import { ObservableSource }` and `import { useObservable }`
- Remove the `component` property
- Add private `onClickFn` arrow function property with multiline body
- Add `get vnode(): VNode` returning `h(VButtonIcon, { ...this.data, onClick: this.onClickFn })`
- Change `readonly key` to non-readonly `key`
- Update getters/setters to use `this.data.icon` directly (not `this.data.value.icon`)

### 5. `app/modules/overlay/entities/modalBase.ts`
- Remove `import type { Viewmodel }` (line 4)
- Change `controls` array type from `Viewmodel[]` to `UIElement[]`
- Change controls rendering from `h(control.component, { key: control.key })` to `control.vnode`

### 6. `app/modules/uikit/mocks/buttonGeneralMock.ts`
- Replace `component: { setup: vi.fn() }` with `vnode: {} as VNode`
- Add `import type { VNode }` from `'vue'`

## Detailed Code Changes

### button.ts
```typescript
// BEFORE
import type { Action } from '@/modules/shared/types/action';
import { Viewmodel } from '../../interfaces/viewmodel';

export abstract class Button extends Viewmodel<string>
{
    abstract isDisabled: boolean;
    abstract setClickHandler(handler: Action): void;
}

// AFTER
import type { Action } from '@/modules/shared/types/action';
import { UIElement } from '../../interfaces/uiElement';

export abstract class Button extends UIElement
{
    abstract isDisabled: boolean;
    abstract setClickHandler(handler: Action): void;
}
```

### buttonGeneralBase.ts
```typescript
// BEFORE
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { ButtonGeneral } from './buttonGeneral';
import type { Color } from '../../types/color';
import { ButtonBase } from './buttonBase';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import VButtonGeneral from '@/modules/uikit/components/VButtonGeneral.vue';
import { useObservable } from '@/modules/shared/composables/useObservable';

export class ButtonGeneralBase extends ButtonBase implements ButtonGeneral
{
    protected readonly data = new ObservableSource({
        title: '',
        color: <Color>'neutral',
        isDisabled: false,
        isLoading: false,
    });

    readonly key = getUniqueId('button-element-general');

    readonly component = {
        setup: () =>
        {
            const data = useObservable(this.data);
            const onClick = () => { this.clickHandler.handle(); };
            return () => h(VButtonGeneral, { ...data.value, onClick });
        }
    };

    get title(): string { return this.data.value.title; }
    set title(value: string) { this.data.mutate({ title: value }); }
    // ... other getters/setters
}

// AFTER
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { ButtonGeneral } from './buttonGeneral';
import type { Color } from '../../types/color';
import { ButtonBase } from './buttonBase';
import VButtonGeneral from '@/modules/uikit/components/VButtonGeneral.vue';
import { shallowReactive } from 'vue';
import type { VNode } from 'vue';

export class ButtonGeneralBase extends ButtonBase implements ButtonGeneral
{
    protected data = shallowReactive({
        title: '',
        color: <Color>'neutral',
        isDisabled: false,
        isLoading: false,
    });

    key = getUniqueId('button-element-general');

    private onClickFn = () =>
    {
        this.clickHandler.handle();
    };

    get vnode(): VNode
    {
        return h(VButtonGeneral, {
            ...this.data,
            onClick: this.onClickFn,
        });
    }

    get title(): string { return this.data.title; }
    set title(value: string) { this.data.title = value; }

    get color(): Color { return this.data.color; }
    set color(value: Color) { this.data.color = value; }

    get isDisabled(): boolean { return this.data.isDisabled; }
    set isDisabled(value: boolean) { this.data.isDisabled = value; }

    get isLoading(): boolean { return this.data.isLoading; }
    set isLoading(value: boolean) { this.data.isLoading = value; }
}
```

### buttonIconBase.ts
```typescript
// AFTER
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { ButtonIcon } from './buttonIcon';
import { ButtonBase } from './buttonBase';
import VButtonIcon from '@/modules/uikit/components/VButtonIcon.vue';
import { shallowReactive } from 'vue';
import type { VNode } from 'vue';

export class ButtonIconBase extends ButtonBase implements ButtonIcon
{
    protected data = shallowReactive({
        isDisabled: false,
        icon: ''
    });

    key = getUniqueId('button-element-icon');

    private onClickFn = () =>
    {
        this.clickHandler.handle();
    };

    get vnode(): VNode
    {
        return h(VButtonIcon, {
            ...this.data,
            onClick: this.onClickFn,
        });
    }

    get icon(): string { return this.data.icon; }
    set icon(value: string) { this.data.icon = value; }

    get isDisabled(): boolean { return this.data.isDisabled; }
    set isDisabled(value: boolean) { this.data.isDisabled = value; }
}
```

### modalBase.ts
```typescript
// BEFORE
import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
// ...
protected controls = shallowReactive(new Array<Viewmodel>());
// ...
controls: () => this.controls.map(control => h(control.component, { key: control.key }))

// AFTER
// Remove the Viewmodel import line entirely
// ...
protected controls = shallowReactive(new Array<UIElement>());
// ...
controls: () => this.controls.map(control => control.vnode)
```

### buttonGeneralMock.ts
```typescript
// BEFORE
import { vi } from 'vitest';
import type { ButtonGeneral } from '../entities/buttons/buttonGeneral';

export const buttonGeneralMock = {
    key: '',
    title: '',
    color: 'neutral',
    isDisabled: false,
    isLoading: false,
    component: {
        setup: vi.fn(),
    },
    setClickHandler: vi.fn(),
} satisfies ButtonGeneral;

// AFTER
import { vi } from 'vitest';
import type { ButtonGeneral } from '../entities/buttons/buttonGeneral';
import type { VNode } from 'vue';

export const buttonGeneralMock = {
    key: '',
    title: '',
    color: 'neutral',
    isDisabled: false,
    isLoading: false,
    vnode: {} as VNode,
    setClickHandler: vi.fn(),
} satisfies ButtonGeneral;
```

## Impact Analysis

### No changes needed:
- `buttonsFactory.ts` / `buttonsFactoryImpl.ts` — only uses `ButtonGeneral` and `ButtonIcon` types, no direct `Viewmodel` reference
- `modalConfirmBase.ts` — pushes buttons to `this.controls` which will now accept `UIElement[]`
- `modalConfirm.ts` — no direct `Viewmodel` reference
- `modal.ts` — no direct `Viewmodel` reference
- `overlayElement.ts` — already extends `UIElement`
- All form entities — already extend `UIElement`

## Verification
1. Run `pnpm precommit` to verify TypeScript compilation, linting, and tests