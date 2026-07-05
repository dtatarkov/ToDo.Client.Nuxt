# DI Package Extraction Plan

## Overview
Extract DI (Dependency Injection) related components from `apps/client/app/modules/shared` into a new `@packages/di` package.

## Current Structure
- **Shared Module**: `apps/client/app/modules/shared`
- **Target Package**: `@packages/di`
- **Composables Location**: `apps/client/app/composables` (already extracted)

## Files to Extract to @packages/di

### 1. Core DI Entities
- `entities/servicesContainer.ts` - Main DI container (ServicesContainer, ServicesScope, BindingBuilder, etc.)

### 2. DI Decorators
- `decorators/dependency.ts` - `@dependency` decorator and `getDependencies` utility

### 3. Types
- `types/serviceIdentifier.ts` - `ServiceIdentifier<T>` type

## Files to Keep in Shared Module
All other DI-related files remain in shared:
- Service implementations (dateParserImpl, dateFormatterImpl, etc.)
- Mappers implementations (timeMapperImpl, zonedDateTimeMapperImpl, etc.)
- Abstract services (dateParser, dateFormatter, loggingService, messagesService)
- Abstract mappers (timeMapper, zonedDateTimeMapper, optionalValueMapper)
- disposeToken, initializationToken
- subscribable interface
- mocks (messagesServiceMock)
- useSharedServices.ts

## Implementation Steps

### Phase 1: Create @packages/di Package
1. Create `packages/di` directory
2. Create `packages/di/package.json` with:
   - name: "@packages/di"
   - type: "module"
   - main: "./index.ts"
   - types: "./index.ts"
   - peerDependencies: vue ^3.5.0
3. Create directory structure: `packages/di/src/entities`, `packages/di/src/decorators`, `packages/di/src/types`

### Phase 2: Move DI Files to Package
4. Copy `servicesContainer.ts` to `packages/di/src/entities/`
5. Copy `dependency.ts` to `packages/di/src/decorators/`
6. Copy `serviceIdentifier.ts` to `packages/di/src/types/`
7. Copy `servicesContainer.test.ts` to `packages/di/test/unit/`

### Phase 3: Update Imports in Moved Files
8. Update `servicesContainer.ts`:
   - Change `../decorators/dependency` to `../decorators/dependency` (relative)
   - Change `../types/serviceIdentifier` to `../types/serviceIdentifier` (relative)
9. Update `dependency.ts` - no changes needed
10. Update `serviceIdentifier.ts` - no changes needed

### Phase 4: Create Package Index
11. Create `packages/di/index.ts` re-exporting all public APIs

### Phase 5: Update Shared Module
12. Remove moved files from `apps/client/app/modules/shared`

### Phase 6: Update Import Statements
13. Update imports in all files:
    - `@/modules/shared/entities/servicesContainer` → `@packages/di/entities/servicesContainer`
    - `@/modules/shared/decorators/dependency` → `@packages/di/decorators/dependency`
    - `@/modules/shared/types/serviceIdentifier` → `@packages/di/types/serviceIdentifier`

### Phase 7: Tests
14. Run tests to verify no regressions

### Phase 8: Verification
15. Run type checking
16. Run tests
17. Verify no circular dependencies

## New Structure
```
packages/di/
├── index.ts
├── package.json
└── src/
    ├── entities/
    │   └── servicesContainer.ts
    ├── decorators/
    │   └── dependency.ts
    └── types/
        └── serviceIdentifier.ts
```

## Import Path Changes
- `@/modules/shared/entities/servicesContainer` → `@packages/di/entities/servicesContainer`
- `@/modules/shared/decorators/dependency` → `@packages/di/decorators/dependency`
- `@/modules/shared/types/serviceIdentifier` → `@packages/di/types/serviceIdentifier`

## Benefits
- Clean separation of DI infrastructure from business logic
- Reusable DI package that can be imported by other projects
- Better organization of code
