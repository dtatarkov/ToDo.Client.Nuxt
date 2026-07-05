# Plan: Add FormElementValidationError

## Overview

Introduce `FormElementValidationError` that extends `ValidationError` with a `formElementName` property and its own `toString()`. `FormElementBase` constructs `FormElementValidationError` internally by wrapping the `ValidationError` from `validateFn` with the element's `name`. `FormValidationError` is updated to accept `FormElementValidationError[]` and its `toString()` delegates to each error's `toString()`.

## Changes

### 1. Create `FormElementValidationError`

**File:** `app/modules/forms/entities/formElementValidationError.ts` (new)

- Extends `ValidationError`
- Adds `formElementName: string` property
- Constructor: `(formElementName: string, message: string)` → passes `message` to parent
- Adds `toString()` method:

```typescript
toString(): string
{
    return `${this.formElementName}:
            - ${this.message}`;
}
```

Full class:

```typescript
import { ValidationError } from '@packages/shared';

export class FormElementValidationError extends ValidationError
{
    constructor(
        public readonly formElementName: string,
        message: string,
    )
    {
        super(message);
    }

    toString(): string
    {
        return `${this.formElementName}:
            - ${this.message}`;
    }
}
```

### 2. Update `FormElementBase`

**File:** `app/modules/forms/entities/formElementBase.ts`

- **Keep** `validateFn` parameter type as `(value: V) => ValidationError | undefined` (unchanged)
- Change `validationError` field type from `ValidationError | undefined` → `FormElementValidationError | undefined`
- Change `getError()` return type from `ValidationError | undefined` → `FormElementValidationError | undefined`
- Change `handleValidationError` parameter type from `ValidationError | undefined` → `FormElementValidationError | undefined`
- **Update `validate()` method** to wrap the result of `validateFn` into `FormElementValidationError`:

```typescript
override validate(): void
{
    this.disposeToken.assertNotDisposed();

    if (this.isInitialValidation)
    {
        this.handleInitialValidation();
    }

    const error = this.validateFn?.(this.value);
    this.validationError = error
        ? new FormElementValidationError(this.name, error.message)
        : undefined;
    this.handleValidationError(this.validationError);
}
```

- Update imports: add `FormElementValidationError`, keep `ValidationError` for `validateFn`

### 3. Update `FormValidationError`

**File:** `app/modules/forms/entities/formValidationError.ts`

- Change `errors` type from `ValidationError[]` → `FormElementValidationError[]`
- Update `toString()` to delegate to each error's `toString()`:

```typescript
toString(): string
{
    return this.errors
        .map(error => error.toString())
        .join('\n');
}
```

- Update import: replace `ValidationError` with `FormElementValidationError`

### 4. Update `FormBase`

**File:** `app/modules/forms/entities/formBase.ts`

- In `emitValidationError()`, the `errors` array type changes from `ValidationError[]` to `FormElementValidationError[]` automatically since `element.getError()` now returns `FormElementValidationError`
- Update import: replace `ValidationError` with `FormElementValidationError`

### 5. Update `formElementMock.ts`

**File:** `app/modules/forms/mocks/formElementMock.ts`

- Change `getError` mock return type to `FormElementValidationError` (import and use the new class)

### 6. Update `formBase.test.ts`

**File:** `app/modules/forms/test/nuxt/formBase.test.ts`

- Replace `new ValidationError(...)` with `new FormElementValidationError('elementName', ...)` in test data
- Update assertions to check `formElementName` property
- Update imports

## Impact Analysis

| File | Change Type |
|------|-------------|
| `app/modules/forms/entities/formElementValidationError.ts` | **New file** |
| `app/modules/forms/entities/formElementBase.ts` | Modify `validate()` to wrap error; update types |
| `app/modules/forms/entities/formValidationError.ts` | Modify types + toString delegates to each error |
| `app/modules/forms/entities/formBase.ts` | Update import |
| `app/modules/forms/mocks/formElementMock.ts` | Update mock |
| `app/modules/forms/test/nuxt/formBase.test.ts` | Update tests |

## Key Design Decisions

1. **`validateFn` stays unchanged** — it still returns `ValidationError | undefined`. `FormElementBase.validate()` wraps the returned `ValidationError` into `FormElementValidationError` using `this.name`. This keeps the validation function interface clean and decoupled from form element identity.

2. **`FormElementValidationError.toString()`** — provides a formatted string with the element name and message.

3. **`FormValidationError.toString()` delegates** — calls `error.toString()` on each `FormElementValidationError` rather than duplicating the formatting logic.