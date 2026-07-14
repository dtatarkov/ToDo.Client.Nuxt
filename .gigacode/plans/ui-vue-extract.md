# Plan: Extract UI Components to packages/ui/vue

## Overview
Extract the following Vue components from `apps/client/app/modules/` to `packages/ui/vue/`:
- All UI components go to `packages/ui/vue/src/components/`

## Components to Extract

### From apps/client/app/modules/uikit/components/
1. VButtonIcon.vue
2. VButtonGeneral.vue
3. VGrid.vue
4. VCard.vue
5. VInfoBlock.vue
6. VInfoRow.vue
7. VToolbar.vue

### From apps/client/app/modules/todo/components/
1. VToDoCard.vue (component, not widget)
2. VToDosWidget.vue (widget - goes to its own folder)

## Types to Extract

### From apps/client/app/modules/uikit/types/
1. cardData.ts
2. color.ts

### From apps/client/app/modules/todo/types/
1. todoCardData.ts

## Utilities to Extract
1. isEmptySlot.ts from apps/client/app/utils/

## Package Structure
```
packages/ui/vue/
├── src/
│   ├── components/
│   │   ├── VButtonIcon.vue
│   │   ├── VButtonGeneral.vue
│   │   ├── VGrid.vue
│   │   ├── VCard.vue
│   │   ├── VInfoBlock.vue
│   │   ├── VInfoRow.vue
│   │   ├── VToolbar.vue
│   │   └── VToDoCard.vue
│   ├── widgets/
│   │   └── VToDosWidget.vue
│   ├── types/
│   │   ├── cardData.ts
│   │   ├── color.ts
│   │   └── todoCardData.ts
│   ├── utils/
│   │   └── isEmptySlot.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

## Changes Required

1. Create package.json for ui/vue
2. Create tsconfig.json for ui/vue
3. Copy all components to new location
4. Update imports in VToDosWidget.vue to use @client/ui/vue
5. Update imports in apps/client/app/pages/index.vue to use @client/ui/vue
6. Update apps/client/app/modules/uikit/components/VToggleIcon.vue
7. Update apps/client/app/modules/sidebar/components/VSidebarTimelineButtonWidget.vue
