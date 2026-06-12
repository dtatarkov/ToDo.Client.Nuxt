# FormElementsFactory Refactoring Plan

## Overview

Refactor `FormElementsFactoryImpl` and `FormElementBase` to simplify the element creation pipeline by removing intermediate data objects and directly constructing input elements with their properties.

## Current Architecture (Problems)

1. **`mapSchemeFieldIntoElementCreateData`** creates a `FormElementCreateData` intermediate object
2. **`createInputElement`** switches on `FormElementType` to create the right input element
3. **`setData`** on `FormElementBase` uses `updatePropertiesWithData` to copy properties from the data object onto `formField` and `inputElement`
4. This is an indirect, multi-step process with unnecessary intermediate objects

## Target Architecture

```
createFormElement(name, fieldScheme, validator)
  |
  ├── createFieldInputElement(fieldScheme)  // replaces mapSchemeFieldIntoElementCreateData
  │     ├── createStringFieldInputElement(fieldScheme)  // replaces mapStringField
  │     │     ├── createInputText(fieldScheme)     // new: calls inputElementsFactory.createInputText(), sets placeholder
  │     │     └── createTextarea(fieldScheme)      // new: calls inputElementsFactory.createTextarea(), sets placeholder
  │     └── createInputDateTime(fieldScheme)       // renamed from createDateTimeFieldInputElement
  │           └── calls inputElementsFactory.createInputDateTime()
  │
  ├── new FormFieldBase()  // formField created inside createFormElement
  ├── formField.name = name
  ├── formField.label = fieldScheme.label
  ├── inputElement.name = name
  ├── new FormElementBase(inputElement, formField, validator)
  └── FormElementBase stores validator, calls validator.validateField(this.name, this.value) internally
```

## Files to Modify

### 1. [`app/modules/forms/entities/formElementBase.ts`](app/modules/forms/entities/formElementBase.ts)

**Changes:**
- Change constructor to accept `formField: FormFieldBase` as second parameter
- Change constructor to accept `validator: EntityValidator` as third parameter
- Remove `protected formField = new FormFieldBase();` (field initialization)
- Remove `protected validateFn` field
- Remove `setData` method entirely
- Remove imports: `FormElementCreateDataWithName`, `updatePropertiesWithData`
- Add import: `EntityValidator` from `@/modules/validation/entities/entityValidator`
- Update `validate()` to call `this.validator.validateField(this.name, this.value)` instead of `this.validateFn?.(this.value)`

**New constructor signature:**
```typescript
constructor(
  protected inputElement: InputElement<V>,
  protected formField: FormFieldBase,
  private validator: EntityValidator,
)
```

Note: `name` is NOT passed to constructor — `FormElementBase` already has `get name()` that returns `this.formField.name`.

### 2. [`app/modules/forms/factories/formElementsFactoryImpl.ts`](app/modules/forms/factories/formElementsFactoryImpl.ts)

**Changes:**
- Remove `mapSchemeFieldIntoElementCreateData` method
- Remove `mapStringField` method
- Remove `mapDateTimeField` method
- Remove `createInputElement` method
- Remove imports: `FormElementType`, `FormElementCreateData`
- Add `createFieldInputElement(fieldScheme: EntityFieldScheme): InputElement | undefined`
- Add `createStringFieldInputElement(fieldScheme: EntityStringFieldScheme): InputElement`
  - delegates to `createInputText(fieldScheme)` or `createTextarea(fieldScheme)` based on `isLong`
- Add `createInputText(fieldScheme: EntityStringFieldScheme): InputElement` — new
  - calls `this.inputElementsFactory.createInputText()`
  - sets `inputElement.placeholder = fieldScheme.placeholder` if present
- Add `createTextarea(fieldScheme: EntityStringFieldScheme): InputElement` — new
  - calls `this.inputElementsFactory.createTextarea()`
  - sets `inputElement.placeholder = fieldScheme.placeholder` if present
- Rename `createDateTimeFieldInputElement` → `createInputDateTime(fieldScheme: EntityDateTimeFieldScheme): InputElement`
  - calls `this.inputElementsFactory.createInputDateTime()`
- Rewrite `createFormElement` to:
  1. Call `createFieldInputElement(fieldScheme)` to get the input element
  2. Create `new FormFieldBase()`
  3. Set `formField.name = name`, `formField.label = fieldScheme.label`
  4. Set `inputElement.name = name`
  5. Create `new FormElementBase(inputElement, formField, validator)` — validator passed directly

### 3. [`app/modules/forms/types/formElementCreateData.ts`](app/modules/forms/types/formElementCreateData.ts)

**Changes:**
- This type becomes unused. Remove the file.

### 4. [`app/modules/forms/types/formElementCreateDataWithName.ts`](app/modules/forms/types/formElementCreateDataWithName.ts)

**Changes:**
- This type becomes unused. Remove the file.

## Detailed Implementation

### `formElementBase.ts` - Constructor Change

```typescript
import { FormFieldBase } from "./formFieldBase";
import { FormElement } from "./formElement";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import type { InputElement } from '@/modules/forms/entities/inputElements/inputElement';
import type { EntityValidator } from '@/modules/validation/entities/entityValidator';

export class FormElementBase<V = any> extends FormElement
{
  private isInitialValidation = true;

  readonly key = getUniqueId('form-element');

  constructor(
    protected inputElement: InputElement<V>,
    protected formField: FormFieldBase,
    private validator: EntityValidator,
  )
  {
    super();
    this.formField.content = inputElement;
  }

  get vnode()
  {
    return this.formField.vnode;
  }

  get name()
  {
    return this.formField.name;
  }

  get value(): V
  {
    return this.inputElement.value;
  }

  set value(value: V)
  {
    this.inputElement.value = value;
  }

  // REMOVED: setData method entirely

  override disable(): void
  {
    this.inputElement.disable();
  }

  override enable(): void
  {
    this.inputElement.enable();
  }

  override validate(): boolean
  {
    if (this.isInitialValidation)
    {
      this.handleInitialValidation();
    }

    const errorMessage = this.validator.validateField(this.name, this.value);
    this.handleErrorMessage(errorMessage);

    return errorMessage == undefined;
  }

  private setupInputValueTracking(): void
  {
    this.inputElement.setValueChangeHandler(() => this.validate());
  }

  private handleInitialValidation(): void
  {
    this.isInitialValidation = false;
    this.setupInputValueTracking();
  }

  private handleErrorMessage(errorMessage: string | undefined): void
  {
    if (errorMessage)
    {
      this.inputElement.toErrorMode();
      this.formField.toErrorMode(errorMessage);
    }
    else
    {
      this.inputElement.toDefaultMode();
      this.formField.toDefaultMode();
    }
  }
}
```

### `formElementsFactoryImpl.ts` - New Implementation

```typescript
import type { FormElement } from '../entities/formElement';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { InputElement } from '@/modules/forms/entities/inputElements/inputElement';
import { InputElementsFactory } from './inputElementsFactory';
import { FormElementBase } from '../entities/formElementBase';
import { FormFieldBase } from '../entities/formFieldBase';
import type { FormElementsFactory } from './formElementsFactory';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import { EntityFieldType } from '@/modules/shared/enums/entityFieldType';
import type { EntityDateTimeFieldScheme, EntityFieldScheme, EntityStringFieldScheme } from '@/modules/shared/types/entityFieldScheme';
import { EntityValidatorFactory } from '@/modules/validation/factories/entityValidatorFactory';
import type { EntityValidator } from '@/modules/validation/entities/entityValidator';

@dependency(InputElementsFactory)
@dependency(EntityValidatorFactory)
export class FormElementsFactoryImpl implements FormElementsFactory
{
    constructor(
        protected inputElementsFactory: InputElementsFactory,
        private entityValidatorFactory: EntityValidatorFactory,
    )
    {
    }

    createElements<TEntity extends Record<string, any>>(
        scheme: EntityScheme<TEntity>
    ): FormElement[]
    {
        const validator = this.entityValidatorFactory.getValidator(scheme);
        const elements: FormElement[] = [];

        for (const [key, fieldScheme] of Object.entries(scheme))
        {
            const element = this.createFormElement(key, fieldScheme, validator);

            if (element)
            {
                elements.push(element);
            }
        }

        return elements;
    }

    private createFormElement<TEntity extends Record<string, any>>(
        name: string,
        fieldScheme: EntityFieldScheme,
        validator: EntityValidator<TEntity>,
    ): FormElement | undefined
    {
        const inputElement = this.createFieldInputElement(fieldScheme);

        if (!inputElement)
        {
            return undefined;
        }

        const formField = new FormFieldBase();
        formField.name = name;
        formField.label = fieldScheme.label ?? '';
        inputElement.name = name;

        return new FormElementBase(inputElement, formField, validator);
    }

    private createFieldInputElement(fieldScheme: EntityFieldScheme): InputElement | undefined
    {
        switch (fieldScheme.type)
        {
            case EntityFieldType.string:
                return this.createStringFieldInputElement(fieldScheme);

            case EntityFieldType.datetime:
                return this.createInputDateTime(fieldScheme);

            default:
                return undefined;
        }
    }

    private createStringFieldInputElement(fieldScheme: EntityStringFieldScheme): InputElement
    {
        return fieldScheme.isLong
            ? this.createTextarea(fieldScheme)
            : this.createInputText(fieldScheme);
    }

    private createInputText(fieldScheme: EntityStringFieldScheme): InputElement
    {
        const inputElement = this.inputElementsFactory.createInputText();

        if (fieldScheme.placeholder)
        {
            inputElement.placeholder = fieldScheme.placeholder;
        }

        return inputElement;
    }

    private createTextarea(fieldScheme: EntityStringFieldScheme): InputElement
    {
        const inputElement = this.inputElementsFactory.createTextarea();

        if (fieldScheme.placeholder)
        {
            inputElement.placeholder = fieldScheme.placeholder;
        }

        return inputElement;
    }

    private createInputDateTime(fieldScheme: EntityDateTimeFieldScheme): InputElement
    {
        return this.inputElementsFactory.createInputDateTime();
    }
}
```

## Removed Imports

From `formElementsFactoryImpl.ts`:
- `FormElementType` — no longer needed
- `FormElementCreateData` — no longer needed

From `formElementBase.ts`:
- `FormElementCreateDataWithName` — no longer needed
- `updatePropertiesWithData` — no longer needed

## Added Imports

To `formElementBase.ts`:
- `EntityValidator` from `@/modules/validation/entities/entityValidator`

## Removed Files

- `app/modules/forms/types/formElementCreateData.ts`
- `app/modules/forms/types/formElementCreateDataWithName.ts`

## Verification Steps

1. Ensure `FormElementBase` constructor accepts `formField` and `validator: EntityValidator`
2. Ensure `FormElementBase.validate()` calls `this.validator.validateField(this.name, this.value)`
3. Ensure `createFormElement` creates `FormFieldBase` and sets `name`/`label`
4. Ensure `createFormElement` sets `inputElement.name`
5. Ensure `createInputText`/`createTextarea` set `placeholder` on the input element
6. Ensure `setData` is removed and no code references it
7. Run TypeScript compilation to verify no type errors
8. Run tests to verify functionality