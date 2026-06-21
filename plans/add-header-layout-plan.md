# Add Header to All Pages

## Overview

Add a global header (and footer) to all pages by creating a set of wrapper components around Nuxt UI primitives, composed together in a `VAppWidget` that lives in `app.vue`.

## Component Hierarchy

```
app.vue
  └── VAppWidget
        ├── VApp (wraps UApp with locale)
        │     ├── VHeaderWidget
        │     │     └── VHeader (wraps UHeader with title prop)
        │     ├── VMain (wraps UMain)
        │     │     └── <slot /> (NuxtPage content)
        │     ├── VFooter (wraps UFooter)
        │     └── VOverlayWidget (existing)
        └── ClientOnly
              └── VOverlayWidget
```

## Steps

### Step 1: Add Nuxt UI components to include list

**File:** [`nuxt.config.ts`](../nuxt.config.ts:38)

Add `'UHeader'`, `'UMain'`, `'UFooter'` to the `ui.components.include` array.

### Step 2: Add `appTitle` to public runtime config

**File:** [`nuxt.config.ts`](../nuxt.config.ts:64)

Add `appTitle: 'ToDo'` to the `runtimeConfig.public` section.

### Step 3: Create `VApp` component

**File:** [`app/modules/uikit/components/VApp.vue`](../app/modules/uikit/components/VApp.vue) (new)

Wraps `UApp` with a `locale` prop. Props type defined inline as `Props`.

```vue
<template>
  <UApp :locale="locale">
    <slot />
  </UApp>
</template>

<script setup lang="ts">
type Props = {
  locale: string;
};

defineProps<Props>();
</script>
```

### Step 4: Create `VHeader` component

**File:** [`app/modules/uikit/components/VHeader.vue`](../app/modules/uikit/components/VHeader.vue) (new)

Wraps `UHeader` with a `title` prop. Props type defined inline as `Props`.

```vue
<template>
  <UHeader :title="title" />
</template>

<script setup lang="ts">
type Props = {
  title: string;
};

defineProps<Props>();
</script>
```

### Step 5: Create `VMain` component

**File:** [`app/modules/uikit/components/VMain.vue`](../app/modules/uikit/components/VMain.vue) (new)

Wraps `UMain` with a slot. No props needed.

```vue
<template>
  <UMain>
    <slot />
  </UMain>
</template>
```

### Step 6: Create `VFooter` component

**File:** [`app/modules/uikit/components/VFooter.vue`](../app/modules/uikit/components/VFooter.vue) (new)

Wraps `UFooter`. No props needed.

```vue
<template>
  <UFooter />
</template>
```

### Step 7: Create `VHeaderWidget` component

**File:** [`app/modules/uikit/components/VHeaderWidget.vue`](../app/modules/uikit/components/VHeaderWidget.vue) (new)

Uses `VHeader` and reads `appTitle` from runtime config. This is a "widget" - a composed component that wires data from the app context.

```vue
<template>
  <VHeader :title="config.public.appTitle" />
</template>

<script setup lang="ts">
import VHeader from '@/modules/uikit/components/VHeader.vue';

const config = useRuntimeConfig();
</script>
```

### Step 8: Create `VAppWidget` component

**File:** [`app/modules/uikit/components/VAppWidget.vue`](../app/modules/uikit/components/VAppWidget.vue) (new)

The top-level layout widget that composes all structural components. This is the single source of layout structure for now. Can be refactored into multiple layouts later.

```vue
<template>
  <VApp :locale="locale">
    <VHeaderWidget />

    <VMain>
      <slot />
    </VMain>

    <VFooter />

    <ClientOnly>
      <VOverlayWidget />
    </ClientOnly>
  </VApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale';
import VApp from '@/modules/uikit/components/VApp.vue';
import VHeaderWidget from '@/modules/uikit/components/VHeaderWidget.vue';
import VMain from '@/modules/uikit/components/VMain.vue';
import VFooter from '@/modules/uikit/components/VFooter.vue';
import VOverlayWidget from '@/modules/overlay/widgets/VOverlayWidget.vue';

const config = useRuntimeConfig();
const locale = (locales as any)[config.public.locale];
</script>
```

### Step 9: Update `app/app.vue`

**File:** [`app/app.vue`](../app/app.vue)

Simplified to just use `VAppWidget` wrapping the page content.

```vue
<template>
  <VAppWidget>
    <NuxtPage />
  </VAppWidget>
</template>

<script setup lang="ts">
import VAppWidget from '@/modules/uikit/components/VAppWidget.vue';

useAppServices();
useGlobalErrorsHandler();
</script>
```

## File Changes Summary

| File | Action |
|------|--------|
| `nuxt.config.ts` | Modify: add `UHeader`, `UMain`, `UFooter` to includes; add `appTitle` to runtimeConfig.public |
| `app/modules/uikit/components/VApp.vue` | Create: wraps UApp with locale prop (inline `Props` type) |
| `app/modules/uikit/components/VHeader.vue` | Create: wraps UHeader with title prop (inline `Props` type) |
| `app/modules/uikit/components/VMain.vue` | Create: wraps UMain with slot |
| `app/modules/uikit/components/VFooter.vue` | Create: wraps UFooter |
| `app/modules/uikit/components/VHeaderWidget.vue` | Create: uses VHeader with appTitle from runtime config |
| `app/modules/uikit/components/VAppWidget.vue` | Create: composes all structural components |
| `app/app.vue` | Modify: simplified to use VAppWidget |

## Architecture Diagram

```mermaid
flowchart TD
    appvue[app.vue] --> vappwidget[VAppWidget]
    vappwidget --> vapp[VApp]
    vappwidget --> locale[useRuntimeConfig - locale]
    vapp --> vheaderwidget[VHeaderWidget]
    vapp --> vmain[VMain]
    vapp --> vfooter[VFooter]
    vapp --> clientonly[ClientOnly]
    clientonly --> voverlay[VOverlayWidget]
    vheaderwidget --> vheader[VHeader]
    vheaderwidget --> config[useRuntimeConfig - appTitle]
    vheader --> uheader[UHeader]
    vmain --> slot[slot]
    slot --> nuxtpage[NuxtPage]
    vfooter --> ufooter[UFooter]