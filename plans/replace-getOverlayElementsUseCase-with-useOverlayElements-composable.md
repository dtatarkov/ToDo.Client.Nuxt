# Replace `GetOverlayElementsUseCase` with `useOverlayElements` Composable

## Problem

The `GetOverlayElementsUseCase` is a thin wrapper around `Overlay.getElements()` that adds no real value — it simply delegates to the `Overlay` service. This is an unnecessary abstraction layer that can be replaced with a simpler composable.

## Current Architecture

```
VOverlayWidget.vue
  └─ useService(GetOverlayElementsUseCase)
       └─ .execute() → Reactive<OverlayElement[]>
            └─ GetOverlayElementsUseCaseImpl.execute()
                 └─ this.overlay.getElements()  (OverlayBase)
                      └─ returns this.elements (shallowReactive array)
```

**Files involved:**
- `app/modules/overlay/usecases/getOverlayElementsUseCase.ts` — abstract class
- `app/modules/overlay/usecases/getOverlayElementsUseCaseImpl.ts` — implementation
- `app/modules/overlay/widgets/VOverlayWidget.vue` — consumer
- `app/modules/overlay/composables/useOverlayServices.ts` — DI registration

## Proposed Architecture

```
VOverlayWidget.vue
  └─ useOverlayElements()
       └─ { overlayElements: Ref<OverlayElement[]> }
            └─ useService(Overlay).getElements()  (OverlayBase)
                 └─ returns this.elements (shallowReactive array)
```

## Changes Required

### 1. Create `app/modules/overlay/composables/useOverlayElements.ts`

New composable that:
- Uses `useService(Overlay)` to get the `Overlay` singleton
- Calls `overlay.getElements()` to get the reactive array
- Wraps it in a `computed` to return a proper `Ref<OverlayElement[]>` without unsafe type casting
- Returns `{ overlayElements }`

```typescript
import { computed } from 'vue';
import { useService } from '@packages/shared';
import { Overlay } from '../entities/overlay';
import type { OverlayElement } from '../entities/overlayElement';
import type { Ref } from 'vue';

export function useOverlayElements(): { overlayElements: Ref<OverlayElement[]> }
{
    const overlay = useService(Overlay);
    const overlayElements = computed(() => overlay.getElements());

    return { overlayElements };
}
```

**Note:** `OverlayBase.getElements()` returns `OverlayElement[]` which is backed by a `shallowReactive` array. The `computed` will re-evaluate whenever the underlying reactive array changes, providing a clean `Ref<OverlayElement[]>` without any type casting.

### 2. Update `app/modules/overlay/widgets/VOverlayWidget.vue`

Replace:
```typescript
import { useService } from '@packages/shared';
import { GetOverlayElementsUseCase } from '../usecases/getOverlayElementsUseCase';

const getOverlayElementsUseCase = useService(GetOverlayElementsUseCase);
const overlayElements = getOverlayElementsUseCase.execute();
```

With:
```typescript
import { useOverlayElements } from '../composables/useOverlayElements';

const { overlayElements } = useOverlayElements();
```

### 3. Update `app/modules/overlay/composables/useOverlayServices.ts`

Remove the `GetOverlayElementsUseCase` registration:
```typescript
// Remove these imports:
import { GetOverlayElementsUseCase } from '../usecases/getOverlayElementsUseCase';
import { GetOverlayElementsUseCaseImpl } from '../usecases/getOverlayElementsUseCaseImpl';

// Remove this line:
useServiceRegistration(GetOverlayElementsUseCase).to(GetOverlayElementsUseCaseImpl).asTransient();
```

### 4. Delete obsolete files

- `app/modules/overlay/usecases/getOverlayElementsUseCase.ts`
- `app/modules/overlay/usecases/getOverlayElementsUseCaseImpl.ts`

### 5. Verify

- Run search for `GetOverlayElementsUseCase` across the entire project — should return 0 results
- Run tests to ensure nothing is broken

## Why This Is Safe

1. `Overlay` is already registered as a singleton in `useOverlayServices()`, so `useService(Overlay)` will always get the same instance
2. The `shallowReactive` array from `OverlayBase.getElements()` is already reactive — the composable just exposes it in a more idiomatic Vue 3 way
3. The `VOverlayWidget.vue` template uses `v-for="element in overlayElements"` which works identically with both `Reactive<OverlayElement[]>` and `Ref<OverlayElement[]>`
4. No other consumers of `GetOverlayElementsUseCase` exist outside the files listed above