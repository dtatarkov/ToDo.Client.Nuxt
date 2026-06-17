# Extract Entity Schemes to `entitySchemes` Module

## Goal

Extract all entity scheme-related files from `app/modules/shared/` into a new top-level module `app/modules/entitySchemes/`, keeping the module self-contained with its own entities, types, exceptions, and mocks.

## Rationale

The entity scheme system (scheme classes, configurators, types, exceptions, mocks) is a distinct domain concept that is used across multiple modules. Extracting it into its own module improves separation of concerns, makes dependencies explicit, and reduces the size of the `shared` module.

## Module Structure

```
app/modules/entitySchemes/
├── entities/
│   ├── entityScheme.ts                          # EntityScheme class
│   ├── entitySchemeConfigurator.ts              # Abstract configurator
│   ├── EntitySchemeConfiguratorImpl.ts          # Configurator implementation
│   ├── EntityFieldScheme.ts                     # Abstract base field scheme
│   ├── entityFieldSchemeBase.ts                 # Base with zod validation
│   ├── entityFieldSchemeConfigurator.ts         # Abstract field configurator
│   ├── entityFieldStringScheme.ts               # String field scheme
│   ├── entityFieldStringSchemeConfigurator.ts   # String field configurator abstract
│   ├── EntityFieldStringSchemeConfiguratorImpl.ts # String field configurator impl
│   ├── entityFieldDateTimeScheme.ts             # DateTime field scheme
│   ├── entityFieldDateTimeSchemeConfigurator.ts # DateTime field configurator abstract
│   ├── entityFieldDateTimeSchemeConfiguratorImpl.ts # DateTime field configurator impl
│   ├── entityFieldHiddenScheme.ts               # Hidden field scheme
│   ├── entityFieldHiddenSchemeConfigurator.ts   # Hidden field configurator abstract
│   ├── EntityFieldHiddenSchemeConfiguratorImpl.ts # Hidden field configurator impl
│   └── validationError.ts                       # ValidationError class
├── types/
│   ├── entitySchemeFields.ts                    # EntitySchemeFields type
│   ├── entitySchemeFieldConfigurators.ts        # EntitySchemeFieldConfigurators type
│   ├── entityFieldStringData.ts                 # EntityFieldStringData type
│   └── entityFieldDateTimeData.ts               # EntityFieldDateTimeData type
├── exceptions/
│   └── entityFieldInvalidConfigurationException.ts
└── mocks/
    └── entityFieldSchemeMock.ts
```

## Files to Move (18 files total)

### From `app/modules/shared/entities/` (15 files)
1. `entityScheme.ts`
2. `entitySchemeConfigurator.ts`
3. `EntitySchemeConfiguratorImpl.ts`
4. `EntityFieldScheme.ts`
5. `entityFieldSchemeBase.ts`
6. `entityFieldSchemeConfigurator.ts`
7. `entityFieldStringScheme.ts`
8. `entityFieldStringSchemeConfigurator.ts`
9. `EntityFieldStringSchemeConfiguratorImpl.ts`
10. `entityFieldDateTimeScheme.ts`
11. `entityFieldDateTimeSchemeConfigurator.ts`
12. `entityFieldDateTimeSchemeConfiguratorImpl.ts`
13. `entityFieldHiddenScheme.ts`
14. `entityFieldHiddenSchemeConfigurator.ts`
15. `EntityFieldHiddenSchemeConfiguratorImpl.ts`
16. `validationError.ts`

### From `app/modules/shared/types/` (4 files)
17. `entitySchemeFields.ts`
18. `entitySchemeFieldConfigurators.ts`
19. `entityFieldStringData.ts`
20. `entityFieldDateTimeData.ts`

### From `app/modules/shared/exceptions/` (1 file)
21. `entityFieldInvalidConfigurationException.ts`

### From `app/modules/shared/mocks/` (1 file)
22. `entityFieldSchemeMock.ts`

## Import Path Changes

### Within the new module (relative paths)

All files within `app/modules/entitySchemes/` reference each other via relative paths. These will need to be updated since the directory depth changes.

**Key mapping of old → new relative imports:**

| File | Old Import | New Import |
|------|-----------|------------|
| `entityScheme.ts` | `'./entitySchemeConfigurator'` | `'./entitySchemeConfigurator'` (same) |
| `entityScheme.ts` | `'../types/entitySchemeFieldConfigurators'` | `'../types/entitySchemeFieldConfigurators'` (same) |
| `entityScheme.ts` | `'../types/entitySchemeFields'` | `'../types/entitySchemeFields'` (same) |
| `entityScheme.ts` | `'./EntitySchemeConfiguratorImpl'` | `'./EntitySchemeConfiguratorImpl'` (same) |
| `EntityFieldScheme.ts` | `'./validationError'` | `'./validationError'` (same) |
| `entityFieldSchemeBase.ts` | `'./validationError'` | `'./validationError'` (same) |
| `entityFieldSchemeBase.ts` | `'./EntityFieldScheme'` | `'./EntityFieldScheme'` (same) |
| `entityFieldStringScheme.ts` | `'./entityFieldSchemeBase'` | `'./entityFieldSchemeBase'` (same) |
| `entityFieldStringScheme.ts` | `'../types/entityFieldStringData'` | `'../types/entityFieldStringData'` (same) |
| `EntityFieldStringSchemeConfiguratorImpl.ts` | `'../types/entityFieldStringData'` | `'../types/entityFieldStringData'` (same) |
| `EntityFieldStringSchemeConfiguratorImpl.ts` | `'../exceptions/entityFieldInvalidConfigurationException'` | `'../exceptions/entityFieldInvalidConfigurationException'` (same) |
| `entityFieldDateTimeScheme.ts` | `'../types/entityFieldDateTimeData'` | `'../types/entityFieldDateTimeData'` (same) |
| `entityFieldDateTimeSchemeConfiguratorImpl.ts` | `'../types/entityFieldDateTimeData'` | `'../types/entityFieldDateTimeData'` (same) |

**Note:** All relative imports within the module stay the same because the internal directory structure (`entities/`, `types/`, `exceptions/`, `mocks/`) mirrors the original structure within `shared/`.

### External files that import from the moved files

These files in `app/modules/shared/` reference the entity scheme files and will need their imports updated:

| File | Old Import | New Import |
|------|-----------|------------|
| `app/modules/shared/types/entitySchemeFields.ts` | `'../entities/EntityFieldScheme'` | `'../../entitySchemes/entities/EntityFieldScheme'` |
| `app/modules/shared/types/entitySchemeFieldConfigurators.ts` | `'../entities/entityFieldSchemeConfigurator'` | `'../../entitySchemes/entities/entityFieldSchemeConfigurator'` |
| `app/modules/shared/mocks/entityFieldSchemeMock.ts` | `'../entities/EntityFieldScheme'` | `'../../entitySchemes/entities/EntityFieldScheme'` |

**Important:** The `entitySchemeFields.ts` and `entitySchemeFieldConfigurators.ts` type files are being **moved** to the new module, so they won't need import updates — they'll be in the new location. The only files in `shared/` that import from the moved files are:
- `app/modules/shared/mocks/entityFieldSchemeMock.ts` — this is also being moved, so no external update needed.

**Conclusion:** There are **no remaining files in `shared/`** that import from the moved files after the move is complete, since all files that reference each other are moving together.

## Migration Steps (Execution Order)

### Step 1: Create directory structure
Create the following directories:
- `app/modules/entitySchemes/`
- `app/modules/entitySchemes/entities/`
- `app/modules/entitySchemes/types/`
- `app/modules/entitySchemes/exceptions/`
- `app/modules/entitySchemes/mocks/`

### Step 2: Copy all files to new locations
Copy each file from its old location to the corresponding new location. Do NOT delete originals yet.

### Step 3: Update imports within moved files
Verify that all relative imports within the new module are correct. Since the internal directory structure is preserved (`entities/`, `types/`, `exceptions/`, `mocks/`), all relative paths should remain valid.

### Step 4: Delete original files
Once all copies are verified, delete the original files from `app/modules/shared/`:
- Delete `app/modules/shared/entities/entityScheme.ts`
- Delete `app/modules/shared/entities/entitySchemeConfigurator.ts`
- Delete `app/modules/shared/entities/EntitySchemeConfiguratorImpl.ts`
- Delete `app/modules/shared/entities/EntityFieldScheme.ts`
- Delete `app/modules/shared/entities/entityFieldSchemeBase.ts`
- Delete `app/modules/shared/entities/entityFieldSchemeConfigurator.ts`
- Delete `app/modules/shared/entities/entityFieldStringScheme.ts`
- Delete `app/modules/shared/entities/entityFieldStringSchemeConfigurator.ts`
- Delete `app/modules/shared/entities/EntityFieldStringSchemeConfiguratorImpl.ts`
- Delete `app/modules/shared/entities/entityFieldDateTimeScheme.ts`
- Delete `app/modules/shared/entities/entityFieldDateTimeSchemeConfigurator.ts`
- Delete `app/modules/shared/entities/entityFieldDateTimeSchemeConfiguratorImpl.ts`
- Delete `app/modules/shared/entities/entityFieldHiddenScheme.ts`
- Delete `app/modules/shared/entities/entityFieldHiddenSchemeConfigurator.ts`
- Delete `app/modules/shared/entities/EntityFieldHiddenSchemeConfiguratorImpl.ts`
- Delete `app/modules/shared/entities/validationError.ts`
- Delete `app/modules/shared/types/entitySchemeFields.ts`
- Delete `app/modules/shared/types/entitySchemeFieldConfigurators.ts`
- Delete `app/modules/shared/types/entityFieldStringData.ts`
- Delete `app/modules/shared/types/entityFieldDateTimeData.ts`
- Delete `app/modules/shared/exceptions/entityFieldInvalidConfigurationException.ts`
- Delete `app/modules/shared/mocks/entityFieldSchemeMock.ts`

### Step 5: Verify no broken imports
Run a search across the entire project for any remaining references to the old paths to ensure nothing is broken.

### Step 6: Run tests
Execute the test suite to verify everything works correctly.

## Risk Assessment

- **Low risk** — All files are moving together as a cohesive unit with preserved internal structure.
- **No circular dependencies** — The entity scheme module has no dependencies on other modules (it only imports `zod` from external packages).
- **No external consumers** — No files outside `shared/` directly import from these entity scheme files (they go through `shared` re-exports or use them indirectly).