# Plan: Extract Icon Names into Static `Icons` Class

## Goal

Extract all hardcoded icon name strings (prefixed with `i-`) into a centralized `Icons` static class in `app/modules/shared/constants/icons.ts`, and update all usages to reference the class properties as `Icons.propertyName`.

## Identified Icon Names

| # | Icon String | Property Name | Used In |
|---|-------------|---------------|---------|
| 1 | `i-heroicons-pencil-square` | `pencilSquare` | `VButtonIcon.stories.ts`, `VToDoCard.vue` |
| 2 | `i-heroicons-trash` | `trash` | `VButtonIcon.stories.ts` |
| 3 | `i-heroicons-plus` | `plus` | `VButtonIcon.stories.ts` |
| 4 | `i-heroicons-check` | `check` | `VButtonIcon.stories.ts` |
| 5 | `i-heroicons-x-mark` | `xMark` | `VButtonIcon.stories.ts` |
| 6 | `i-heroicons-heart` | `heart` | `VButtonIcon.stories.ts` |
| 7 | `i-heroicons-star` | `star` | `VButtonIcon.stories.ts` |
| 8 | `i-heroicons-cog` | `cog` | `VButtonIcon.stories.ts` |
| 9 | `i-heroicons-bell` | `bell` | `VButtonIcon.stories.ts` |
| 10 | `i-heroicons-home` | `home` | `VButtonIcon.stories.ts` |
| 11 | `i-heroicons-question-mark-circle` | `questionMarkCircle` | `VButtonIcon.vue` (default prop) |
| 12 | `i-heroicons-exclamation-triangle` | `exclamationTriangle` | `todoStateSaved.ts`, `todoStateNew.ts` |

## Steps

### Step 1: Create `app/modules/shared/constants/icons.ts`

Create a new file exporting a static `Icons` class with `static readonly` properties for all 12 icon names.

```typescript
export class Icons
{
    static readonly pencilSquare = 'i-heroicons-pencil-square';
    static readonly trash = 'i-heroicons-trash';
    static readonly plus = 'i-heroicons-plus';
    static readonly check = 'i-heroicons-check';
    static readonly xMark = 'i-heroicons-x-mark';
    static readonly heart = 'i-heroicons-heart';
    static readonly star = 'i-heroicons-star';
    static readonly cog = 'i-heroicons-cog';
    static readonly bell = 'i-heroicons-bell';
    static readonly home = 'i-heroicons-home';
    static readonly questionMarkCircle = 'i-heroicons-question-mark-circle';
    static readonly exclamationTriangle = 'i-heroicons-exclamation-triangle';
}
```

### Step 2: Update `app/modules/uikit/components/VButtonIcon.vue`

- Import `Icons` from `@/modules/shared/constants/icons`
- Replace default prop value `'i-heroicons-question-mark-circle'` with `Icons.questionMarkCircle`

### Step 3: Update `app/modules/uikit/stories/VButtonIcon.stories.ts`

- Import `Icons` from `@/modules/shared/constants/icons`
- Replace all hardcoded icon strings in `options` array with `Icons.*` references
- Replace `icon: 'i-heroicons-pencil-square'` in story args with `icon: Icons.pencilSquare`

### Step 4: Update `app/modules/todo/entities/todoStateSaved.ts`

- Import `Icons` from `@/modules/shared/constants/icons`
- Replace `icon: 'i-heroicons-exclamation-triangle'` with `icon: Icons.exclamationTriangle`

### Step 5: Update `app/modules/todo/entities/todoStateNew.ts`

- Import `Icons` from `@/modules/shared/constants/icons`
- Replace `icon: 'i-heroicons-exclamation-triangle'` with `icon: Icons.exclamationTriangle`

### Step 6: Update `app/modules/todo/components/VToDoCard.vue`

- Import `Icons` from `@/modules/shared/constants/icons`
- Replace `icon="i-heroicons-pencil-square"` with `:icon="Icons.pencilSquare"` (note the dynamic binding with `:` prefix)

## Property Naming Convention

- Convert kebab-case to camelCase (e.g., `x-mark` → `xMark`, `question-mark-circle` → `questionMarkCircle`)
- Use descriptive names matching the icon's purpose

## Type Safety

Using `static readonly` ensures the properties are typed as `string` literal types, providing full type safety when used in components.