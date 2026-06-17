# EntityScheme Validation Refactoring Plan (Final)

## Overview

Refactor the validation system to allow custom error messages for `EntityScheme` validation. The new design embeds Zod validation directly into field configurators, eliminating the separate `EntityValidator` abstraction.

## Current Architecture

```
EntityScheme<TEntity> (type)
  └── { [K in keyof TEntity]: EntityFieldScheme }

EntityFieldScheme (union type)
  ├── EntityStringFieldScheme { type, label?, placeholder?, isLong?, isRequired? }
  ├── EntityDateTimeFieldScheme { type, label? }
  └── EntityHiddenFieldScheme { type }

EntityValidator<TEntity> (abstract class)
  └── validateField<K>(field, value): ValidationError | undefined

EntityValidatorZod4<TEntity> (concrete)
  └── buildSchemas(scheme) → Map<key, z.ZodType>
  └── validateField(field, value) → uses Zod to validate

FormElementBase
  └── validate() → calls validator.validateField(this.name, this.value)
```

## Target Architecture

```
EntityFieldSchemeBase (abstract class)
  ├── protected zod4Scheme: z.ZodType
  └── validate(value): ValidationError | undefined  ← shared implementation

EntityFieldStringScheme extends EntityFieldSchemeBase
  ├── readonly label?: string
  ├── readonly placeholder?: string
  ├── readonly isLong: boolean (default: false)
  └── constructor(zod4Scheme, data: EntityFieldStringData)

EntityFieldDateTimeScheme extends EntityFieldSchemeBase
  ├── readonly label?: string
  └── constructor(zod4Scheme, data: EntityFieldDateTimeData)

EntityFieldHiddenScheme extends EntityFieldSchemeBase
  └── uses z.any() as zod4Scheme

EntityFieldStringData (type)
  └── { label?, placeholder?, isLong? }

EntityFieldDateTimeData (type)
  └── { label? }

EntityFieldConfiguratorBase<TScheme> (abstract class)
  └── abstract toScheme(): TScheme

EntityFieldStringConfigurator extends EntityFieldConfiguratorBase<EntityFieldStringScheme>
  ├── withLabel(label: string): this
  ├── withPlaceholder(placeholder: string): this
  ├── isRequired(message: string): this  ← throws if called twice
  ├── isLong(): this
  └── toScheme(): EntityFieldStringScheme

EntityFieldDateTimeConfigurator extends EntityFieldConfiguratorBase<EntityFieldDateTimeScheme>
  ├── withLabel(label: string): this
  └── toScheme(): EntityFieldDateTimeScheme

EntityFieldHiddenConfigurator extends EntityFieldConfiguratorBase<EntityFieldHiddenScheme>
  └── toScheme(): EntityFieldHiddenScheme

EntitySchemeConfigurator
  ├── string(): EntityFieldStringConfigurator
  ├── datetime(): EntityFieldDateTimeConfigurator
  └── hidden(): EntityFieldHiddenConfigurator

EntityFieldConfigurators<TEntity> (type)
  └── { [K in keyof TEntity]: EntityFieldConfiguratorBase<any> }

EntitySchemeFields<TEntity, TConfigurators> (type)
  └── { [K in keyof TConfigurators]: TConfigurators[K] extends EntityFieldConfiguratorBase<infer TScheme> ? TScheme : never }

EntityField (class with static create method)
  └── static create<TEntity, TConfigurators>(setup): EntitySchemeFields<TEntity, TConfigurators>
```

## Key Type Relationships

```typescript
// Base configurator abstract class
abstract class EntityFieldConfiguratorBase<TScheme> {
    abstract toScheme(): TScheme;
}

// Maps TEntity keys to configurators
type EntityFieldConfigurators<TEntity extends Record<string, any>> = {
    [K in keyof TEntity]: EntityFieldConfiguratorBase<any>
};

// Extracts scheme types from configurators using conditional type inference
type EntitySchemeFields<TEntity extends Record<string, any>, TFieldConfigurators extends EntityFieldConfigurators<TEntity>> = {
    [K in keyof TFieldConfigurators]: TFieldConfigurators[K] extends EntityFieldConfiguratorBase<infer TScheme> ? TScheme : never;
};

// Factory class
class EntityField {
    static create<TEntity extends Record<string, any>, TConfigurators extends EntityFieldConfigurators<TEntity>>(
        setup: (scheme: EntitySchemeConfigurator) => TConfigurators
    ): EntitySchemeFields<TEntity, TConfigurators>;
}
```

## Key Design Decisions

### 1. EntityFieldSchemeBase with shared validate()

All field scheme classes extend `EntityFieldSchemeBase` which holds the `zod4Scheme` and implements `validate()`:

```typescript
abstract class EntityFieldSchemeBase<TValue = any> {
    protected zod4Scheme: z.ZodType<TValue>;

    constructor(zod4Scheme: z.ZodType<TValue>) {
        this.zod4Scheme = zod4Scheme;
    }

    validate(value: TValue): ValidationError | undefined {
        const result = this.zod4Scheme.safeParse(value);
        if (!result.success) {
            return new ValidationError(result.error.issues[0]?.message ?? '');
        }
        return undefined;
    }
}
```

`EntityFieldHiddenScheme` uses `z.any()` as its zod4Scheme, so the base `validate()` works without override.

### 2. Each scheme class in its own file

```
app/modules/validation/entities/
  ├── entityFieldSchemeBase.ts       ← abstract base class
  ├── entityFieldStringScheme.ts     ← string scheme
  ├── entityFieldDateTimeScheme.ts   ← datetime scheme
  ├── entityFieldHiddenScheme.ts     ← hidden scheme
  ├── entityFieldConfiguratorBase.ts ← abstract configurator base
  ├── entityFieldStringConfigurator.ts
  ├── entityFieldDateTimeConfigurator.ts
  ├── entityFieldHiddenConfigurator.ts
  ├── entitySchemeConfigurator.ts    ← factory interface
  └── entityField.ts                 ← EntityField class with create()
```

### 3. Data types for scheme construction

```typescript
type EntityFieldStringData = {
    label?: string;
    placeholder?: string;
    isLong?: boolean;  // default: false
};

type EntityFieldDateTimeData = {
    label?: string;
};
```

Configurators build data objects and pass them to scheme constructors. Schemes expose data as individual readonly properties.

### 4. Configurators are abstract classes (not interfaces)

This allows shared implementation in the base class and enforces the contract.

### 5. isRequired throws if called twice

`EntityFieldStringConfiguratorImpl.isRequired()` checks if already called and throws `EntityFieldInvalidConfigurationException`.

### 6. No factory functions — constructors called directly in EntityField.create()

Instead of `createStringConfigurator()`, `EntityField.create()` calls `new EntityFieldStringConfiguratorImpl()` directly.

### 7. EntityField.create() uses reduce for scheme construction

```typescript
static create<TEntity, TConfigurators>(
    setup: (scheme: EntitySchemeConfigurator) => TConfigurators
): EntitySchemeFields<TEntity, TConfigurators> {
    const configurator: EntitySchemeConfigurator = {
        string: () => new EntityFieldStringConfiguratorImpl(),
        datetime: () => new EntityFieldDateTimeConfiguratorImpl(),
        hidden: () => new EntityFieldHiddenConfiguratorImpl(),
    };

    const result = setup(configurator);
    
    return (Object.keys(result) as Array<keyof TConfigurators>).reduce(
        (scheme, key) => {
            (scheme as any)[key] = result[key].toScheme();
            return scheme;
        },
        {} as EntitySchemeFields<TEntity, TConfigurators>
    );
}
```

### 8. EntityValidator is removed entirely

## Files to Create

| File | Purpose |
|------|---------|
| `app/modules/validation/entities/entityFieldSchemeBase.ts` | Abstract base with `zod4Scheme` and `validate()` |
| `app/modules/validation/entities/entityFieldStringScheme.ts` | String scheme with `label`, `placeholder`, `isLong` |
| `app/modules/validation/entities/entityFieldDateTimeScheme.ts` | DateTime scheme with `label` |
| `app/modules/validation/entities/entityFieldHiddenScheme.ts` | Hidden scheme (uses z.any()) |
| `app/modules/validation/entities/entityFieldConfiguratorBase.ts` | Abstract configurator base with `toScheme()` |
| `app/modules/validation/entities/entityFieldStringConfigurator.ts` | String configurator impl |
| `app/modules/validation/entities/entityFieldDateTimeConfigurator.ts` | DateTime configurator impl |
| `app/modules/validation/entities/entityFieldHiddenConfigurator.ts` | Hidden configurator impl |
| `app/modules/validation/entities/entitySchemeConfigurator.ts` | `EntitySchemeConfigurator` interface |
| `app/modules/validation/entities/entityField.ts` | `EntityField` class with `static create()` |
| `app/modules/validation/exceptions/entityFieldInvalidConfigurationException.ts` | Exception for invalid config |

## Files to Modify

| File | Changes |
|------|---------|
| `app/modules/shared/types/entityScheme.ts` | Remove (replaced by types in validation module) |
| `app/modules/shared/types/entityFieldScheme.ts` | Remove (replaced by classes) |
| `app/modules/forms/entities/formElementBase.ts` | Accept scheme object, use `fieldScheme.validate()` |
| `app/modules/forms/factories/formElementsFactoryImpl.ts` | Remove `EntityValidatorFactory`, use scheme |
| `app/modules/todo/entities/todoStateBase.ts` | Use `EntityField.create()` fluent API |
| `app/modules/validation/composables/useValidationServices.ts` | Remove registration |
| Tests (3 files) | Update to new APIs |

## Files to Remove

| File | Reason |
|------|--------|
| `app/modules/shared/types/entityFieldScheme.ts` | Replaced by classes |
| `app/modules/shared/types/entityScheme.ts` | Replaced by types in validation |
| `app/modules/validation/entities/entityValidator.ts` | Logic moved to schemes |
| `app/modules/validation/entities/entityValidatorZod4.ts` | Logic moved to configurators |
| `app/modules/validation/factories/entityValidatorFactory.ts` | No longer needed |
| `app/modules/validation/factories/entityValidatorFactoryCached.ts` | No longer needed |
| `app/modules/validation/mocks/entityValidatorMock.ts` | No longer needed |
| `app/modules/validation/mocks/entityValidatorFactoryMock.ts` | No longer needed |

## Implementation Steps

### Step 1: Create EntityFieldInvalidConfigurationException

**File:** `app/modules/validation/exceptions/entityFieldInvalidConfigurationException.ts`

```typescript
export class EntityFieldInvalidConfigurationException extends Error {
    constructor(message: string) {
        super(message);
    }
}
```

### Step 2: Create EntityFieldSchemeBase

**File:** `app/modules/validation/entities/entityFieldSchemeBase.ts`

```typescript
import { ValidationError } from './validationError';
import type { z } from 'zod';

export abstract class EntityFieldSchemeBase<TValue = any> {
    protected zod4Scheme: z.ZodType<TValue>;

    constructor(zod4Scheme: z.ZodType<TValue>) {
        this.zod4Scheme = zod4Scheme;
    }

    validate(value: TValue): ValidationError | undefined {
        const result = this.zod4Scheme.safeParse(value);
        if (!result.success) {
            return new ValidationError(result.error.issues[0]?.message ?? '');
        }
        return undefined;
    }
}
```

### Step 3: Create EntityFieldStringScheme

**File:** `app/modules/validation/entities/entityFieldStringScheme.ts`

```typescript
import { EntityFieldSchemeBase } from './entityFieldSchemeBase';
import type { z } from 'zod';

export type EntityFieldStringData = {
    label?: string;
    placeholder?: string;
    isLong?: boolean;
};

export class EntityFieldStringScheme extends EntityFieldSchemeBase<string> {
    readonly label?: string;
    readonly placeholder?: string;
    readonly isLong: boolean;

    constructor(zod4Scheme: z.ZodType<string>, data: EntityFieldStringData) {
        super(zod4Scheme);
        this.label = data.label;
        this.placeholder = data.placeholder;
        this.isLong = data.isLong ?? false;
    }
}
```

### Step 4: Create EntityFieldDateTimeScheme

**File:** `app/modules/validation/entities/entityFieldDateTimeScheme.ts`

```typescript
import { EntityFieldSchemeBase } from './entityFieldSchemeBase';
import type { z } from 'zod';

export type EntityFieldDateTimeData = {
    label?: string;
};

export class EntityFieldDateTimeScheme extends EntityFieldSchemeBase<Date | undefined> {
    readonly label?: string;

    constructor(zod4Scheme: z.ZodType<Date | undefined>, data: EntityFieldDateTimeData) {
        super(zod4Scheme);
        this.label = data.label;
    }
}
```

### Step 5: Create EntityFieldHiddenScheme

**File:** `app/modules/validation/entities/entityFieldHiddenScheme.ts`

```typescript
import { z } from 'zod';
import { EntityFieldSchemeBase } from './entityFieldSchemeBase';

export class EntityFieldHiddenScheme extends EntityFieldSchemeBase<any> {
    constructor() {
        super(z.any());
    }
}
```

### Step 6: Create EntityFieldConfiguratorBase

**File:** `app/modules/validation/entities/entityFieldConfiguratorBase.ts`

```typescript
export abstract class EntityFieldConfiguratorBase<TScheme> {
    abstract toScheme(): TScheme;
}
```

### Step 7: Create EntityFieldStringConfigurator

**File:** `app/modules/validation/entities/entityFieldStringConfigurator.ts`

```typescript
import { z } from 'zod';
import { EntityFieldConfiguratorBase } from './entityFieldConfiguratorBase';
import { EntityFieldStringScheme, type EntityFieldStringData } from './entityFieldStringScheme';
import { EntityFieldInvalidConfigurationException } from '../exceptions/entityFieldInvalidConfigurationException';

export abstract class EntityFieldStringConfigurator extends EntityFieldConfiguratorBase<EntityFieldStringScheme> {
    abstract withLabel(label: string): this;
    abstract withPlaceholder(placeholder: string): this;
    abstract isRequired(message: string): this;
    abstract isLong(): this;
}

export class EntityFieldStringConfiguratorImpl extends EntityFieldStringConfigurator {
    private zod4Scheme = z.string();
    private data: EntityFieldStringData = {};
    private isRequiredCalled = false;

    withLabel(label: string): this {
        this.data.label = label;
        return this;
    }

    withPlaceholder(placeholder: string): this {
        this.data.placeholder = placeholder;
        return this;
    }

    isRequired(message: string): this {
        if (this.isRequiredCalled) {
            throw new EntityFieldInvalidConfigurationException(
                'isRequired can only be called once'
            );
        }
        this.isRequiredCalled = true;
        this.zod4Scheme = this.zod4Scheme.nonempty(message);
        return this;
    }

    isLong(): this {
        this.data.isLong = true;
        return this;
    }

    toScheme(): EntityFieldStringScheme {
        return new EntityFieldStringScheme(this.zod4Scheme, this.data);
    }
}
```

### Step 8: Create EntityFieldDateTimeConfigurator

**File:** `app/modules/validation/entities/entityFieldDateTimeConfigurator.ts`

```typescript
import { z } from 'zod';
import { EntityFieldConfiguratorBase } from './entityFieldConfiguratorBase';
import { EntityFieldDateTimeScheme, type EntityFieldDateTimeData } from './entityFieldDateTimeScheme';

export abstract class EntityFieldDateTimeConfigurator extends EntityFieldConfiguratorBase<EntityFieldDateTimeScheme> {
    abstract withLabel(label: string): this;
}

export class EntityFieldDateTimeConfiguratorImpl extends EntityFieldDateTimeConfigurator {
    private zod4Scheme = z.date().optional();
    private data: EntityFieldDateTimeData = {};

    withLabel(label: string): this {
        this.data.label = label;
        return this;
    }

    toScheme(): EntityFieldDateTimeScheme {
        return new EntityFieldDateTimeScheme(this.zod4Scheme, this.data);
    }
}
```

### Step 9: Create EntityFieldHiddenConfigurator

**File:** `app/modules/validation/entities/entityFieldHiddenConfigurator.ts`

```typescript
import { EntityFieldConfiguratorBase } from './entityFieldConfiguratorBase';
import { EntityFieldHiddenScheme } from './entityFieldHiddenScheme';

export abstract class EntityFieldHiddenConfigurator extends EntityFieldConfiguratorBase<EntityFieldHiddenScheme> {
}

export class EntityFieldHiddenConfiguratorImpl extends EntityFieldHiddenConfigurator {
    toScheme(): EntityFieldHiddenScheme {
        return new EntityFieldHiddenScheme();
    }
}
```

### Step 10: Create EntitySchemeConfigurator

**File:** `app/modules/validation/entities/entitySchemeConfigurator.ts`

```typescript
import type { EntityFieldStringConfigurator } from './entityFieldStringConfigurator';
import type { EntityFieldDateTimeConfigurator } from './entityFieldDateTimeConfigurator';
import type { EntityFieldHiddenConfigurator } from './entityFieldHiddenConfigurator';

export interface EntitySchemeConfigurator {
    string(): EntityFieldStringConfigurator;
    datetime(): EntityFieldDateTimeConfigurator;
    hidden(): EntityFieldHiddenConfigurator;
}
```

### Step 11: Create EntityField with static create()

**File:** `app/modules/validation/entities/entityField.ts`

```typescript
import type { EntityFieldConfiguratorBase } from './entityFieldConfiguratorBase';
import type { EntitySchemeConfigurator } from './entitySchemeConfigurator';
import { EntityFieldStringConfiguratorImpl } from './entityFieldStringConfigurator';
import { EntityFieldDateTimeConfiguratorImpl } from './entityFieldDateTimeConfigurator';
import { EntityFieldHiddenConfiguratorImpl } from './entityFieldHiddenConfigurator';

export type EntityFieldConfigurators<TEntity extends Record<string, any>> = {
    [K in keyof TEntity]: EntityFieldConfiguratorBase<any>
};

export type EntitySchemeFields<TEntity extends Record<string, any>, TFieldConfigurators extends EntityFieldConfigurators<TEntity>> = {
    [K in keyof TFieldConfigurators]: TFieldConfigurators[K] extends EntityFieldConfiguratorBase<infer TScheme> ? TScheme : never;
};

export class EntityField {
    static create<TEntity extends Record<string, any>, TConfigurators extends EntityFieldConfigurators<TEntity>>(
        setup: (scheme: EntitySchemeConfigurator) => TConfigurators
    ): EntitySchemeFields<TEntity, TConfigurators> {
        const configurator: EntitySchemeConfigurator = {
            string: () => new EntityFieldStringConfiguratorImpl(),
            datetime: () => new EntityFieldDateTimeConfiguratorImpl(),
            hidden: () => new EntityFieldHiddenConfiguratorImpl(),
        };

        const result = setup(configurator);

        return (Object.keys(result) as Array<keyof TConfigurators>).reduce(
            (scheme, key) => {
                (scheme as any)[key] = result[key].toScheme();
                return scheme;
            },
            {} as EntitySchemeFields<TEntity, TConfigurators>
        );
    }
}
```

### Step 12: Update FormElementBase

**File:** `app/modules/forms/entities/formElementBase.ts`

- Replace `EntityValidator` parameter with the scheme object
- In `validate()`, access the field scheme by name: `(this.scheme as any)[this.name]`
- Call `fieldScheme.validate(this.value)`

### Step 13: Update FormElementsFactoryImpl

**File:** `app/modules/forms/factories/formElementsFactoryImpl.ts`

- Remove `EntityValidatorFactory` dependency
- Pass scheme object to `FormElementBase` instead of `EntityValidator`
- Extract field data (label, placeholder, isLong) from scheme class properties

### Step 14: Update ToDoStateBase

**File:** `app/modules/todo/entities/todoStateBase.ts`

Replace the plain object scheme with the fluent API.

### Step 15: Remove obsolete files

### Step 16: Update tests

## Usage Example

```typescript
// ToDoStateBase.ts
this.scheme = EntityField.create<ToDoData>(scheme => ({
    id: scheme.hidden(),

    title: scheme
        .string()
        .withLabel(this.messagesService.getMessage('todo.field.title.label'))
        .withPlaceholder(this.messagesService.getMessage('todo.field.title.placeholder'))
        .isRequired('Заполните название задачи'),

    description: scheme
        .string()
        .withLabel(this.messagesService.getMessage('todo.field.description.label'))
        .withPlaceholder(this.messagesService.getMessage('todo.field.description.placeholder'))
        .isLong(),

    completionDatePlanned: scheme
        .datetime()
        .withLabel(this.messagesService.getMessage('todo.field.completionDatePlanned.label')),

    completionDateActual: scheme.hidden(),
}));

// Usage:
const error = this.scheme.title.validate(value);
const label = this.scheme.title.label;
const placeholder = this.scheme.title.placeholder;
const isLong = this.scheme.title.isLong;  // false by default