# Plan: Reverse Form - EntityScheme Relation

## Current Architecture

Currently, the relationship flows like this:

```
EntityScheme.create() → EntityScheme (has fields: Record<string, EntityFieldScheme>)
FormFactory.create(config: { scheme: EntityScheme, submit }) → Form
FormElementsFactory.createElements(scheme: EntityScheme) → FormElement[]
  - iterates scheme.fields
  - for each field, inspects fieldScheme type (instanceof checks)
  - creates InputElement + FormField + FormElement
  - reads label/placeholder from fieldScheme public properties
```

**Problems:**
1. `FormElementsFactoryImpl` uses `instanceof` checks on `EntityFieldScheme` subtypes to decide which input element to create — this is a violation of Open/Closed principle and couples form creation to entity scheme internals.
2. `EntityFieldScheme` subclasses expose `label`, `placeholder`, `isLong` as public readonly properties that are only used by the form layer.
3. `FormConfiguration` requires an `EntityScheme` which contains validation logic AND form-display data mixed together.

## Target Architecture

The new relationship should flow like this:

```
EntityScheme.create() → EntityScheme (has fields, plus getFormElements() method)
  EntityScheme.getFormElements() → FormElementsCreateData
    - internally calls each field's createFormElement() to build FormElementsCreateData
    - uses mapObject utility with omitUndefined=true

EntityFieldScheme.createFormElement(): FormElementCreateData | undefined
  - each field scheme knows what kind of form element it represents
  - returns data object (not the actual FormElement instance)
  - returns undefined for hidden fields (omitted by mapObject)

FormBase accepts elements: FormElementsCreateData instead of scheme
  - FormElementsCreateData is Record<string, FormElementCreateData>
  - FormBase uses FormElementsFactory to convert data → FormElement instances

FormElementCreateData = union of input element data types + label, excluding name
```

## Detailed Changes

### Step 1: Create `FormElementGenericCreateData` type (new file)

**File:** `app/modules/forms/types/formElementGenericCreateData.ts` (NEW)

A single generic type that takes the corresponding `InputElementXxxData` interface and the `FormElementType` as type parameters, omits `name`, and adds `type` + `label`:

```typescript
import type { FormElementType } from '../enums/formElementType';

export type FormElementGenericCreateData<
  TInputElementData,
  TType extends FormElementType
> = Omit<TInputElementData, 'name'> & {
  type: TType;
  label?: string;
};
```

### Step 2: Create `FormElementCreateData` union type (new file)

**File:** `app/modules/forms/types/formElementCreateData.ts` (NEW)

The discriminated union type composed from `FormElementGenericCreateData`:

```typescript
import type { FormElementType } from '../enums/formElementType';
import type { FormElementGenericCreateData } from './formElementGenericCreateData';
import type { InputElementTextData } from '../entities/inputElements/inputElementText';
import type { InputElementTextareaData } from '../entities/inputElements/inputElementTextarea';
import type { InputElementDateData } from '../entities/inputElements/InputElementDate';
import type { InputElementTimeData } from '../entities/inputElements/inputElementTime';
import type { InputElementDateTimeData } from '../entities/inputElements/inputElementDateTime';

export type FormElementCreateData =
  | FormElementGenericCreateData<InputElementTextData, FormElementType.inputText>
  | FormElementGenericCreateData<InputElementTextareaData, FormElementType.textarea>
  | FormElementGenericCreateData<InputElementDateData, FormElementType.inputDate>
  | FormElementGenericCreateData<InputElementTimeData, FormElementType.inputTime>
  | FormElementGenericCreateData<InputElementDateTimeData, FormElementType.inputDateTime>;
```

### Step 3: Create `FormElementsCreateData` type (new file)

**File:** `app/modules/forms/types/formElementsCreateData.ts` (NEW)

```typescript
import type { FormElementCreateData } from './formElementCreateData';

export type FormElementsCreateData = Record<string, FormElementCreateData>;
```

### Step 2: Add `hidden` to `FormElementType` enum

**File:** `app/modules/forms/enums/formElementType.ts`

Add `hidden = 'hidden'` to the enum.

### Step 3: Add `createFormElement()` to `EntityFieldScheme`

**File:** `app/modules/entitySchemes/entities/EntityFieldScheme.ts`

```typescript
import type { FormElementCreateData } from '@/modules/forms/types/formElementCreateData';

export abstract class EntityFieldScheme<TValue = any>
{
    abstract validate(value: TValue): ValidationError | undefined;
    abstract createFormElement(): FormElementCreateData | undefined;
}
```

### Step 4: Implement `createFormElement()` in each scheme subclass

**File:** `app/modules/entitySchemes/entities/entityFieldStringScheme.ts`

```typescript
override createFormElement(): FormElementCreateData
{
    if (this.isLong)
    {
        return {
            type: FormElementType.textarea,
            label: this.label ?? '',
            placeholder: this.placeholder,
        };
    }

    return {
        type: FormElementType.inputText,
        label: this.label ?? '',
        placeholder: this.placeholder,
    };
}
```

**File:** `app/modules/entitySchemes/entities/entityFieldDateTimeScheme.ts`

```typescript
override createFormElement(): FormElementCreateData
{
    return {
        type: FormElementType.inputDateTime,
        label: this.label ?? '',
    };
}
```

**File:** `app/modules/entitySchemes/entities/entityFieldHiddenScheme.ts`

```typescript
override createFormElement(): FormElementCreateData | undefined
{
    return undefined; // hidden fields don't produce form elements
}
```

### Step 5: Make `EntityFieldScheme` data private and remove data properties construction

**File:** `app/modules/entitySchemes/entities/entityFieldStringScheme.ts`

- Make `label`, `placeholder`, `isLong` private (or remove public readonly)
- Keep them accessible internally for `createFormElement()` and `validate()`
- The data is no longer needed to be publicly readable since form layer no longer reads it directly

**File:** `app/modules/entitySchemes/entities/entityFieldDateTimeScheme.ts`

- Same treatment for `label`

**File:** `app/modules/entitySchemes/types/entityFieldStringData.ts` and `entityFieldDateTimeData.ts`

- These types can potentially be removed or made internal to the configurator implementations since the data is no longer passed to scheme constructors from outside.

### Step 4: Create `mapObject` utility (new file)

**File:** `app/modules/shared/utils/mapObject.ts` (NEW)

```typescript
export function mapObject<TInput extends Record<string, any>, TOutput>(
    obj: TInput,
    mapFn: (value: TInput[keyof TInput], key: keyof TInput) => TOutput | undefined,
    omitUndefined: boolean = true
): Record<keyof TInput, TOutput>
{
    const result = {} as Record<keyof TInput, TOutput>;

    for (const key of Object.keys(obj) as Array<keyof TInput>)
    {
        const mapped = mapFn(obj[key], key);

        if (omitUndefined && mapped === undefined)
        {
            continue;
        }

        result[key] = mapped as TOutput;
    }

    return result;
}
```

### Step 5: Add `getFormElements()` method to `EntityScheme`

**File:** `app/modules/entitySchemes/entities/entityScheme.ts`

```typescript
import type { FormElementsCreateData } from '@/modules/forms/types/formElementsCreateData';
import { mapObject } from '@packages/shared';

export class EntityScheme<TEntity extends Record<string, any>>
{
    private constructor(
        public readonly fields: EntitySchemeFields<TEntity>
    ) { }

    getFormElements(): FormElementsCreateData
    {
        return mapObject(
            this.fields,
            (fieldScheme) => fieldScheme.createFormElement()
        );
    }
}
```

### Step 7: Update `FormConfiguration` type

**File:** `app/modules/forms/entities/form.ts`

```typescript
import type { FormElementsCreateData } from '../types/formElementCreateData';

export type FormConfiguration<TEntity extends Record<string, any>> = {
  submit: Func<Promise<void>, [Record<keyof TEntity, any>]>;
  elements: FormElementsCreateData;
};
```

Remove the `scheme` field from `FormConfiguration`.

### Step 8: Update `FormBase` to accept `FormElementsCreateData`

**File:** `app/modules/forms/entities/formBase.ts`

- Constructor receives `elements: FormElementsCreateData` instead of `configuration: FormConfiguration`
- Uses `FormElementsFactory` to convert `FormElementsCreateData` → `FormElement[]`
- The factory method signature changes from accepting `EntityScheme` to accepting `FormElementsCreateData`

### Step 9: Update `FormElementsFactory` and `FormElementsFactoryImpl`

**File:** `app/modules/forms/factories/formElementsFactory.ts`

```typescript
import type { FormElementsCreateData } from '../types/formElementCreateData';
import type { FormElement } from "../entities/formElement";

export abstract class FormElementsFactory
{
    abstract createElements(elementsData: FormElementsCreateData): FormElement[];
}
```

**File:** `app/modules/forms/factories/formElementsFactoryImpl.ts`

- Remove `instanceof` checks on `EntityFieldScheme` subtypes
- Instead, switch on `FormElementCreateData.type` (the `FormElementType` enum)
- Create `InputElement` based on the type
- Set `label` from the data (not from fieldScheme)
- Set `placeholder` from the data (not from fieldScheme)
- No longer needs to import `EntityFieldStringScheme`, `EntityFieldDateTimeScheme`, etc.

### Step 10: Update `FormFactory` and `FormFactoryImpl`

**File:** `app/modules/forms/factories/formFactory.ts`

```typescript
import type { Form, FormConfiguration } from '../entities/form';

export abstract class FormFactory
{
  abstract create<TEntity extends Record<string, any> = Record<string, any>>(
    configuration: FormConfiguration<TEntity>
  ): Form<TEntity>;
}
```

The `FormFactory` interface stays the same, but `FormConfiguration` now has `elements` instead of `scheme`.

**File:** `app/modules/forms/factories/formFactoryImpl.ts`

- Pass `configuration.elements` to `FormBase` constructor instead of `configuration.scheme`

### Step 11: Update consumers (ToDoStateBase, ToDoStateNew, ToDoStateSaved)

**File:** `app/modules/todo/entities/todoStateBase.ts`

- The scheme is still needed for validation and now also for `getFormElements()`

**File:** `app/modules/todo/entities/todoStateNew.ts` and `todoStateSaved.ts`

```typescript
// Before:
const form = this.formFactory.create<ToDoData>({
    scheme: this.scheme,
    submit: data => ...
});

// After:
const form = this.formFactory.create<ToDoData>({
    elements: this.scheme.getFormElements(),
    submit: data => ...
});
```

### Step 12: Remove `FormElementData` type (if no longer needed)

**File:** `app/modules/forms/types/formElementData.ts`

- This type may become obsolete since `FormElementCreateData` replaces it. Verify usage before deleting.

## Dependency Graph

```
┌──────────────────────┐
│  EntityScheme        │
│  - fields            │
│  + createForm() ──────┬──→ uses FormFactory + FormConfiguration
└──────────┬───────────┘   │
           │               │
           ▼               ▼
┌──────────────────────┐  ┌──────────────────────────┐
│  EntityFieldScheme   │  │  FormConfiguration        │
│  + createFormElement()│  │  - submit                │
└──────────┬───────────┘  │  - elements: FormElements │
           │              └──────────┬───────────────┘
           ▼                         │
┌──────────────────────┐            │
│  FormElementCreateData│            │
│  (union type)        │            │
└──────────────────────┘            │
                                    ▼
                           ┌──────────────────────┐
                           │  FormBase             │
                           │  + elements: FormElement│
                           └──────────────────────┘
```

## Migration Sequence

The implementation should follow this order to maintain a working codebase at each step:

1. Create `FormElementGenericCreateData` type (new file)
2. Create `FormElementCreateData` union type (new file)
3. Create `FormElementsCreateData` type (new file)
4. Create `mapObject` utility (new file)
5. Add `createFormElement()` to `EntityFieldScheme` abstract class
6. Implement `createFormElement()` in all scheme subclasses
7. Make field scheme data private
8. Add `getFormElements()` to `EntityScheme` (uses `mapObject`)
9. Update `FormConfiguration` type (replace `scheme` with `elements`)
10. Update `FormElementsFactory` interface (accept `FormElementsCreateData`)
11. Update `FormElementsFactoryImpl` (switch on type enum, remove instanceof)
12. Update `FormBase` constructor (accept elements data)
13. Update `FormFactoryImpl` (pass elements data)
14. Update consumers (`ToDoStateBase`, `ToDoStateNew`, `ToDoStateSaved`)
15. Clean up: remove `FormElementData` if unused, remove `EntityFieldStringData`/`EntityFieldDateTimeData` if unused