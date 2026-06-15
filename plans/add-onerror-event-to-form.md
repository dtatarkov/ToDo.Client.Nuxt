# Plan: Add `onError` Event to Form

## Overview

Add an `onError` event to the Form entity that fires when form validation fails during submit. This involves creating new `ValidationError` and `FormValidationError` classes, refactoring the validation pipeline to use typed error objects instead of raw strings, and wiring the event through the form's submit command.

## Architecture & Data Flow

```mermaid
flowchart TD
    A[FormSubmitCommand.executeAsync] --> B{validate?}
    B -->|false| C[emitValidationError]
    B -->|true| D[submit data]
    
    C --> E[Gather errors from all FormElements]
    E --> F[Construct FormValidationError]
    F --> G[Emit onErrorEvent]
    
    subgraph FormElement.validate
        H[validator.validateField] --> I[ValidationError | undefined]
        I --> J[Save to private validationError]
        J --> K[Return this.isValid]
    end
    
    subgraph FormElementBase.handleValidationError
        L[ValidationError] --> M[inputElement.toErrorMode]
        L --> N[formField.setError]
    end
```

## Files to Create

### 1. [`app/modules/validation/entities/validationError.ts`](app/modules/validation/entities/validationError.ts) — NEW

```typescript
export class ValidationError
{
    constructor(
        public readonly message: string
    ) { }
}
```

### 2. [`app/modules/forms/entities/formValidationError.ts`](app/modules/forms/entities/formValidationError.ts) — NEW

```typescript
import { ValidationError } from '@/modules/validation/entities/validationError';

export class FormValidationError
{
    constructor(
        public readonly errors: ValidationError[]
    ) { }
}
```

## Files to Modify

### 3. [`app/modules/validation/entities/entityValidator.ts`](app/modules/validation/entities/entityValidator.ts)

- Import `ValidationError`
- Change return type of `validateField` from `string | undefined` to `ValidationError | undefined`

### 4. [`app/modules/validation/entities/entityValidatorZod4.ts`](app/modules/validation/entities/entityValidatorZod4.ts)

- Import `ValidationError`
- Change return type of `validateField` to `ValidationError | undefined`
- Wrap error message string in `new ValidationError(message)` instead of returning raw string

### 5. [`app/modules/forms/entities/formElement.ts`](app/modules/forms/entities/formElement.ts)

- Import `ValidationError`
- Add abstract methods:
  - `abstract isValid(): boolean`
  - `abstract getError(): ValidationError | undefined`

### 6. [`app/modules/forms/entities/formElementBase.ts`](app/modules/forms/entities/formElementBase.ts)

- Import `ValidationError`
- Add private property: `private validationError: ValidationError | undefined`
- Rename `handleErrorMessage` → `handleValidationError`, change parameter type from `string | undefined` to `ValidationError | undefined`
- Update `validate()`:
  - Save `validationError` from `validator.validateField()` result into private property
  - Call `handleValidationError(validationError)` instead of `handleErrorMessage(errorMessage)`
  - Return `this.isValid()` instead of direct comparison
- Implement `isValid()`: return `this.validationError == undefined`
- Implement `getError()`: return `this.validationError`

### 7. [`app/modules/forms/entities/formField.ts`](app/modules/forms/entities/formField.ts)

- Import `ValidationError`
- Rename `toErrorMode(errorMessage: string)` → `setError(error: ValidationError): void`
- Rename `toDefaultMode()` → `clearError(): void`

### 8. [`app/modules/forms/entities/formFieldBase.ts`](app/modules/forms/entities/formFieldBase.ts)

- Import `ValidationError`
- Rename `toErrorMode` → `setError(error: ValidationError): void` — use `error.message` for the help text
- Rename `toDefaultMode` → `clearError(): void` — unchanged logic

### 9. [`app/modules/forms/entities/inputElements/inputElement.ts`](app/modules/forms/entities/inputElements/inputElement.ts)

- **NO CHANGES** — interface stays unchanged per user request

### 10. [`app/modules/forms/entities/inputElements/inputElementBase.ts`](app/modules/forms/entities/inputElements/inputElementBase.ts)

- **NO CHANGES** — interface stays unchanged per user request

### 11. [`app/modules/forms/entities/form.ts`](app/modules/forms/entities/form.ts)

- Import `FormValidationError`, `Action`, `DisposeToken`
- Add abstract method: `abstract onError(handler: Action<[FormValidationError]>, token: DisposeToken): void`

### 12. [`app/modules/forms/entities/formBase.ts`](app/modules/forms/entities/formBase.ts)

- Import `EntityEvent`, `DisposeToken`, `FormValidationError`, `ValidationError`, `Action`
- Add private property: `private errorEvent = new EntityEvent<FormValidationError>()`
- Implement `onError(handler: Action<[FormValidationError]>, token: DisposeToken): void` — wire to `errorEvent.on(handler, token)`
- In `createSubmitCommand`, when `!this.validate()`:
  - Call `this.emitValidationError()` before returning `false`
- Add private method `emitValidationError()`:
  - Gather errors from all elements via `element.getError()`
  - Filter out `undefined` values
  - Construct `FormValidationError` with the collected errors
  - Emit via `this.errorEvent.emit(formValidationError)`
- In `[Symbol.dispose]()`: dispose `this.errorEvent`