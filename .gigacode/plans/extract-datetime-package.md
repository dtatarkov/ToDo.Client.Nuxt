# Plan: Extract DateTime Classes to DateTime Package

## Overview
Extract date formatting and parsing classes from the `@packages/shared` package into a new `@packages/datetime` package. Only abstract classes will be exposed; implementations will remain internal with a `registerDateTimeServices` function for DI registration.

## Current State
- **Source Package**: `@packages/shared` at `packages/shared`
- **Target Package**: `@packages/datetime` (to be created at `packages/datetime`)
- **Files to Extract**:
  - `DateFormatter` (abstract class) - **EXPOSED**
  - `DateFormatterConfiguration` (abstract class) - **EXPOSED**
  - `DateFormatterImpl` (implementation) - **INTERNAL**
  - `DateParser` (abstract class) - **EXPOSED**
  - `DateParserImpl` (implementation) - **INTERNAL**

## Dependencies Analysis

### Files that will be moved
1. `packages/shared/src/services/dateFormatter.ts` - Contains DateFormatter and DateFormatterConfiguration (exposed)
2. `packages/shared/src/services/dateFormatterImpl.ts` - Contains DateFormatterImpl (internal)
3. `packages/shared/src/services/dateParser.ts` - Contains DateParser (exposed)
4. `packages/shared/src/services/dateParserImpl.ts` - Contains DateParserImpl (internal)

### Files that will NOT be moved
- `packages/shared/src/services/loggingService.ts` - Not date-related
- `packages/shared/src/services/loggingServiceImpl.ts` - Not date-related
- `packages/shared/src/services/messagesService.ts` - Not date-related
- `packages/shared/src/services/messagesServiceImpl.ts` - Not date-related

### Files that depend on extracted classes
1. **`apps/client/app/modules/todo/mappers/todoDtoMapperImpl.ts`** - Uses `DateParser`

### Internal dependencies within shared package
- `dateFormatterImpl.ts` imports from `dateFormatter.ts` (same directory) ✓ (won't change)
- `dateParserImpl.ts` imports from `dateParser.ts` (same directory) ✓ (won't change)

## Implementation Steps

### Phase 1: Create @packages/datetime Package

#### Step 1.1: Create directory structure
- Create `packages/datetime` directory
- Create `packages/datetime/src` directory
- Create `packages/datetime/src/services` directory
- Create `packages/datetime/src/utils` directory (for registerDateTimeServices)
- Create `packages/datetime/test/unit` directory (for unit tests)

#### Step 1.2: Create package.json
```json
{
  "name": "@packages/datetime",
  "type": "module",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "scripts": {
    "test": "vitest run"
  },
  "dependencies": {
    "@packages/di": "workspace:*",
    "@packages/shared": "workspace:*",
    "luxon": "3.7.2"
  },
  "devDependencies": {
    "vitest": "3.2.4",
    "@types/luxon": "3.7.1"
  }
}
```

#### Step 1.3: Copy source files
- Copy `packages/shared/src/services/dateFormatter.ts` → `packages/datetime/src/services/dateFormatter.ts`
- Copy `packages/shared/src/services/dateFormatterImpl.ts` → `packages/datetime/src/services/dateFormatterImpl.ts`
- Copy `packages/shared/src/services/dateParser.ts` → `packages/datetime/src/services/dateParser.ts`
- Copy `packages/shared/src/services/dateParserImpl.ts` → `packages/datetime/src/services/dateParserImpl.ts`

#### Step 1.4: Copy test files
- Copy `packages/shared/test/unit/DateFormatterImpl.test.ts` → `packages/datetime/test/unit/DateFormatterImpl.test.ts`
- Copy `packages/shared/test/unit/DateParserImpl.test.ts` → `packages/datetime/test/unit/DateParserImpl.test.ts`

### Phase 2: Create registerDateTimeServices utility

#### Step 2.1: Create packages/datetime/src/utils/registerDateTimeServices.ts
```typescript
import type { ServicesContainer } from '@packages/di';
import { DateFormatterConfiguration } from '../services/dateFormatter';
import { DateFormatter, DateFormatterImpl } from '../services/dateFormatterImpl';
import { DateParser, DateParserImpl } from '../services/dateParserImpl';

export function registerDateTimeServices(container: ServicesContainer, locale: string): void
{
    container.bind(DateFormatterConfiguration)
        .toDynamicValue((): DateFormatterConfiguration => ({
            locale,
        }))
        .asSingleton();

    container.bind(DateParser).to(DateParserImpl).asTransient();
    container.bind(DateFormatter).to(DateFormatterImpl).asTransient();
}
```

### Phase 3: Create Package Index (expose only abstract classes)

#### Step 3.1: Create packages/datetime/index.ts
Export only abstract classes (not implementations):
```typescript
// Services
export { DateFormatter, DateFormatterConfiguration } from './services/dateFormatter';
export { DateParser } from './services/dateParser';

// Utils
export { registerDateTimeServices } from './utils/registerDateTimeServices';
```

### Phase 4: Update Shared Package Index

#### Step 4.1: Update packages/shared/src/index.ts
Remove the following exports:
```typescript
// Services
export { DateFormatter, DateFormatterConfiguration } from './services/dateFormatter';  // REMOVE
export { DateFormatterImpl } from './services/dateFormatterImpl';  // REMOVE
export { DateParser } from './services/dateParser';  // REMOVE
export { DateParserImpl } from './services/dateParserImpl';  // REMOVE
```

#### Step 4.2: Update registerSharedServices.ts
Remove the datetime-related bindings from `registerSharedServices`:
```typescript
// Remove these lines:
container.bind(DateFormatterConfiguration)...
container.bind(DateParser).to(DateParserImpl)...
container.bind(DateFormatter).to(DateFormatterImpl)...
```

### Phase 5: Update Imports in apps/client

#### Step 5.1: Update apps/client/app/modules/todo/mappers/todoDtoMapperImpl.ts
Change:
```typescript
import { DateParser } from '@packages/shared';
```
To:
```typescript
import { DateParser } from '@packages/datetime';
```

### Phase 6: Register datetime services in app

#### Step 6.1: Update app initialization
Find where `registerSharedServices` is called and add `registerDateTimeServices` call BEFORE it:
```typescript
import { registerDateTimeServices } from '@packages/datetime';
import { registerSharedServices } from '@packages/shared';

// In app initialization
registerDateTimeServices(container, locale);
registerSharedServices(container, t, locale);
```

{"text": "### Phase 7: Add aliases to nuxt and vite\n\n#### Step 7.1: Add @packages/datetime alias to nuxt.config.ts\nAdd to alias:\n```typescript\n'@packages/datetime': path.resolve(__dirname, '../../packages/datetime/src/index.ts'),\n```\n\n#### Step 7.2: Add @packages/datetime alias to vite.config.ts\nAdd to resolve.alias:\n```typescript\n'@packages/datetime': path.resolve(__dirname, '../../packages/datetime/src'),\n```\n\n### Phase 8: Verify pnpm workspace configuration"}

#### Step 7.1: Verify pnpm-workspace.yaml
Ensure `pnpm-workspace.yaml` includes:
```yaml
packages:
  - 'packages/*'
```
(This should already be present)

{"text": "### Phase 9: Update test imports (if needed)\n\n#### Step 9.1: Check test files for imports\nIf the test files import from `@packages/shared`, update them to import from `@packages/datetime`.\n\n### Phase 10: Verify the extraction"}

#### Step 9.1: Run type checking
```bash
pnpm typecheck
```

#### Step 9.2: Run tests
```bash
pnpm test
```

#### Step 9.3: Verify no circular dependencies
Ensure there are no circular dependencies between packages.

## Files Created
- `packages/datetime/package.json`
- `packages/datetime/index.ts`
- `packages/datetime/src/services/dateFormatter.ts`
- `packages/datetime/src/services/dateFormatterImpl.ts`
- `packages/datetime/src/services/dateParser.ts`
- `packages/datetime/src/services/dateParserImpl.ts`
- `packages/datetime/src/utils/registerDateTimeServices.ts`
- `packages/datetime/test/unit/DateFormatterImpl.test.ts`
- `packages/datetime/test/unit/DateParserImpl.test.ts`

## Files Modified
- `packages/shared/src/index.ts` - Remove datetime exports
- `packages/shared/src/utils/registerSharedServices.ts` - Remove datetime bindings
- `apps/client/app/modules/todo/mappers/todoDtoMapperImpl.ts` - Update import from @packages/shared to @packages/datetime
- App initialization file - Add `registerDateTimeServices` call

## Files to Delete (after verification)
- `packages/shared/src/services/dateFormatter.ts`
- `packages/shared/src/services/dateFormatterImpl.ts`
- `packages/shared/src/services/dateParser.ts`
- `packages/shared/src/services/dateParserImpl.ts`
- `packages/shared/test/unit/DateFormatterImpl.test.ts`
- `packages/shared/test/unit/DateParserImpl.test.ts`

## Import Path Changes
- `@packages/shared` - Remove exports for DateFormatter, DateFormatterConfiguration, DateFormatterImpl, DateParser, DateParserImpl
- `@packages/datetime` - New package with abstract classes and registerDateTimeServices
- `apps/client/app/modules/todo/mappers/todoDtoMapperImpl.ts` - Update import from `@packages/shared` to `@packages/datetime`
- App initialization - Add `registerDateTimeServices(container, locale)` call

## Benefits
- Clean separation of date formatting and parsing concerns
- Reusable datetime package that can be imported by other projects
- Better organization of code with proper dependency injection
- Internal implementations hidden, only abstract classes exposed
- Easier to maintain and extend date/time functionality
- Follows dependency injection pattern with registerDateTimeServices (similar to registerSharedServices)

## Notes
- The datetime package has a dependency on `luxon` for date parsing/formatting
- The datetime package has a dependency on `@packages/di` for the DI container
- The datetime package has a dependency on `@packages/shared` for `ServicesContainer` type
- DateFormatterImpl uses `@dependency(DateFormatterConfiguration)` decorator, so DateFormatterConfiguration must be registered via `registerDateTimeServices`
- Only abstract classes are exported from the package; implementations remain internal
- The `registerDateTimeServices` function follows the same pattern as `registerSharedServices` from the shared package
- After extraction, ensure all applications that use these classes import from `@packages/datetime` instead of `@packages/shared`
