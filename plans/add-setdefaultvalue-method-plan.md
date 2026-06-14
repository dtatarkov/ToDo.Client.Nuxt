# Plan: Add `setDefaultValue()` Method to Form Elements

## Overview

Add a `setDefaultValue()` method to the form element hierarchy that resets an element's value to its initial default. This method is then used in `FormBase.setData()` to reset elements whose data keys are not present in the provided data object.

## Motivation

When `FormBase.setData(data)` is called with partial data (e.g., during form initialization or reset), elements not present in `data` should be reset to their default values rather than retaining their previous values.

## Class Hierarchy & Changes

### 1. [`InputElement<V>`](app/modules/forms/entities/inputElements/inputElement.ts) (abstract interface)

**Change:** Add abstract `setDefaultValue(): void` method.

```typescript
export abstract class InputElement<V = unknown> extends UIElement implements InputElementData<V>
{
  // ... existing declarations ...
  abstract setDefaultValue(): void;  // NEW
}
```

### 2. [`InputElementBase<V>`](app/modules/forms/entities/inputElements/inputElementBase.ts) (abstract base implementation)

**Change:** Implement `setDefaultValue()` by delegating to the existing `getDefaultValue()` method.

```typescript
override setDefaultValue(): void
{
  this.disposeToken.assertNotDisposed();
  this.value = this.getDefaultValue();
}
```

This reuses the existing `getDefaultValue()` abstract method that all concrete input elements already implement (e.g., `InputElementStringBase` returns `''`, `InputElementDateBase` returns `undefined`).

### 3. [`FormElement`](app/modules/forms/entities/formElement.ts) (abstract class)

**Change:** Add abstract `setDefaultValue(): void` method.

```typescript
export abstract class FormElement<V = any> extends UIElement
{
  // ... existing declarations ...
  abstract setDefaultValue(): void;  // NEW
}
```

### 4. [`FormElementBase`](app/modules/forms/entities/formElementBase.ts) (concrete implementation)

**Change:** Implement `setDefaultValue()` by delegating to `this.inputElement.setDefaultValue()`.

```typescript
override setDefaultValue(): void
{
  this.disposeToken.assertNotDisposed();
  this.inputElement.setDefaultValue();
}
```

### 5. [`FormBase.setData()`](app/modules/forms/entities/formBase.ts)

**Change:** In the `setData()` method, when an element's name is NOT found in the data object, call `element.setDefaultValue()` instead of leaving the element unchanged.

**Current code (lines 92-103):**
```typescript
override setData(data: Record<keyof TEntity, any>)
{
  this.assertNotDisabled();

  for (const element of this.elementsRef.value)
  {
    if (element.name in data)
    {
      element.value = data[element.name];
    }
  }
}
```

**New code:**
```typescript
override setData(data: Record<keyof TEntity, any>)
{
  this.assertNotDisabled();

  for (const element of this.elementsRef.value)
  {
    if (element.name in data)
    {
      element.value = data[element.name];
    }
    else
    {
      element.setDefaultValue();
    }
  }
}
```

## Data Flow Diagram

```mermaid
flowchart LR
    A[FormBase.setData] --> B{Element name in data?}
    B -->|Yes| C[element.value = data[name]]
    B -->|No| D[element.setDefaultValue]
    D --> E[FormElementBase.setDefaultValue]
    E --> F[inputElement.setDefaultValue]
    F --> G[InputElementBase.setDefaultValue]
    G --> H[this.value = this.getDefaultValue]
    H --> I[Concrete: returns '' or undefined]
```

## Files to Modify (in order)

| # | File | Change |
|---|------|--------|
| 1 | [`app/modules/forms/entities/inputElements/inputElement.ts`](app/modules/forms/entities/inputElements/inputElement.ts) | Add `abstract setDefaultValue(): void` |
| 2 | [`app/modules/forms/entities/inputElements/inputElementBase.ts`](app/modules/forms/entities/inputElements/inputElementBase.ts) | Implement `setDefaultValue()` calling `getDefaultValue()` |
| 3 | [`app/modules/forms/entities/formElement.ts`](app/modules/forms/entities/formElement.ts) | Add `abstract setDefaultValue(): void` |
| 4 | [`app/modules/forms/entities/formElementBase.ts`](app/modules/forms/entities/formElementBase.ts) | Implement `setDefaultValue()` delegating to `inputElement` |
| 5 | [`app/modules/forms/entities/formBase.ts`](app/modules/forms/entities/formBase.ts) | Update `setData()` to call `element.setDefaultValue()` for missing keys |

## No New Files Required

All changes are modifications to existing files. No new files need to be created.

## No Breaking Changes

- `setDefaultValue()` is additive — it doesn't change any existing method signatures.
- The `setData()` behavior change is intentional and backward-compatible for callers that pass complete data objects (all keys present).
- For callers that pass partial data, the behavior changes from "keep old value" to "reset to default", which is the desired improvement.