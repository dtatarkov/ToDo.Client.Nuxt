# ISP for AppPublicRuntimeConfig

## Goal

Apply the Interface Segregation Principle (ISP) to `AppPublicRuntimeConfig` by creating dedicated, minimal configuration types for `DateFormatter` and `ToDosRepository`. Each service depends only on the config fields it actually needs, rather than the full `AppPublicRuntimeConfig`.

## Key Design

- `DateFormatterConfiguration` and `ToDosRepositoryConfiguration` are **abstract classes** with **abstract fields** (same pattern as `AppPublicRuntimeConfig`)
- They are registered in DI via `toDynamicValue` as **object literals** from `useRuntimeConfig().public`
- `DateFormatter` and `ToDosRepository` **keep** their `.to(Impl)` registration — the `@dependency` decorator on the Impl classes auto-resolves the new config types from the container
- `useRuntimeConfig()` is called at the **root** of both `useSharedServices` and `useTodoServices`

## Architecture

```mermaid
flowchart TD
    subgraph "Before (monolithic)"
        A[AppPublicRuntimeConfig] -->|@dependency| B[DateFormatterImpl]
        A -->|@dependency| C[ToDosRepositoryImpl]
    end

    subgraph "After (ISP)"
        D[DateFormatterConfiguration\nabstract locale: string] -->|@dependency| E[DateFormatterImpl]
        F[ToDosRepositoryConfiguration\nabstract apiBaseUrl: string] -->|@dependency| G[ToDosRepositoryImpl]
        
        H[useSharedServices] -->|toDynamicValue| I[{ locale } as DateFormatterConfiguration]
        J[useTodoServices] -->|toDynamicValue| K[{ apiBaseUrl } as ToDosRepositoryConfiguration]
        
        E -.->|.to DateFormatterImpl| H
        G -.->|.to ToDosRepositoryImpl| J
    end
```

## Step-by-step Plan

### Step 1: Add `DateFormatterConfiguration` to [`DateFormatter`](app/modules/shared/services/dateFormatter.ts)

Add at the bottom of the file:

```typescript
export abstract class DateFormatterConfiguration
{
    abstract locale: string;
}
```

### Step 2: Add `ToDosRepositoryConfiguration` to [`ToDosRepository`](app/modules/todo/repositories/todosRepository.ts)

Add at the bottom of the file:

```typescript
export abstract class ToDosRepositoryConfiguration
{
    abstract apiBaseUrl: string;
}
```

### Step 3: Update [`useSharedServices`](app/modules/shared/composables/useSharedServices.ts)

Changes:
1. Import `DateFormatterConfiguration` from `../services/dateFormatter`
2. Call `useRuntimeConfig()` at the **root** of the function (move it out of the `toDynamicValue` callback)
3. Add registration for `DateFormatterConfiguration` via `toDynamicValue` as singleton
4. Keep `DateFormatter` registration as `.to(DateFormatterImpl)` — **unchanged**
5. Keep `AppPublicRuntimeConfig` registration — **unchanged**

```typescript
export function useSharedServices(): void
{
    const { t } = useI18n();
    const config = useRuntimeConfig();

    useServiceRegistration(AppPublicRuntimeConfig).toDynamicValue(() =>
    {
        return config.public;
    }).asSingleton();

    useServiceRegistration(DateFormatterConfiguration).toDynamicValue(() =>
    {
        return { locale: config.public.locale } as DateFormatterConfiguration;
    }).asSingleton();

    useServiceRegistration(DisposeToken).to(DisposeToken).asTransient();
    useServiceRegistration(DateParser).to(DateParserImpl).asTransient();
    useServiceRegistration(DateFormatter).to(DateFormatterImpl).asTransient();
    useServiceRegistration(ZonedDateTimeMapper).to(ZonedDateTimeMapperImpl).asTransient();
    useServiceRegistration(TimeMapper).to(TimeMapperImpl).asTransient();
    useServiceRegistration(MessagesService).toDynamicValue(() => new MessagesServiceImpl(t)).asSingleton();
    useServiceRegistration(LoggingService).to(LoggingServiceImpl).asSingleton();
}
```

### Step 4: Update [`useTodoServices`](app/modules/todo/composables/useTodoServices.ts)

Changes:
1. Import `ToDosRepositoryConfiguration` from `../repositories/todosRepository`
2. Import `useRuntimeConfig` from `#imports`
3. Call `useRuntimeConfig()` at the **root** of the function
4. Add registration for `ToDosRepositoryConfiguration` via `toDynamicValue` as singleton
5. Keep `ToDosRepository` registration as `.to(ToDosRepositoryImpl)` — **unchanged**

```typescript
import { useRuntimeConfig } from "#imports";

export function useTodoServices(): void
{
    const config = useRuntimeConfig();

    useServiceRegistration(ToDosRepositoryConfiguration).toDynamicValue(() =>
    {
        return { apiBaseUrl: config.public.apiBaseUrl } as ToDosRepositoryConfiguration;
    }).asSingleton();

    useServiceRegistration(ToDosRepository).to(ToDosRepositoryImpl).asTransient();
    useServiceRegistration(ToDoDtoMapper).to(ToDoDtoMapperImpl).asTransient();
    useServiceRegistration(ToDosOwner).to(ToDosOwnerBase).asSingleton();
    useServiceRegistration(ToDoFactory).to(ToDoFactoryImpl).asTransient();
}
```

### Step 5: Update [`DateFormatterImpl`](app/modules/shared/services/dateFormatterImpl.ts)

Changes:
1. Import `DateFormatterConfiguration` instead of `AppPublicRuntimeConfig`
2. Update `@dependency` decorator to use `DateFormatterConfiguration`
3. Update constructor parameter type from `AppPublicRuntimeConfig` to `DateFormatterConfiguration`
4. `this.config.locale` usage stays the same

### Step 6: Update [`ToDosRepositoryImpl`](app/modules/todo/repositories/todosRepositoryImpl.ts)

Changes:
1. Import `ToDosRepositoryConfiguration` instead of `AppPublicRuntimeConfig`
2. Update `@dependency` decorator to use `ToDosRepositoryConfiguration`
3. Update constructor parameter type from `AppPublicRuntimeConfig` to `ToDosRepositoryConfiguration`
4. `this.config.apiBaseUrl` usage stays the same

### Step 7: Update [`DateFormatterImpl` test](app/modules/shared/test/unit/dateFormatterImpl.test.ts)

Changes:
1. Import `DateFormatterConfiguration` instead of `AppPublicRuntimeConfig`
2. Replace the full `AppPublicRuntimeConfig` mock with an object literal:

```typescript
const config: DateFormatterConfiguration = {
    locale: 'ru'
};
const formatter = new DateFormatterImpl(config);
```

### Step 8: Verify no broken imports or references

Check that:
- No other files import `AppPublicRuntimeConfig` from `DateFormatterImpl` or `ToDosRepositoryImpl`
- All tests still pass
- The app compiles without errors

## Files Changed Summary

| File | Change |
|------|--------|
| `app/modules/shared/services/dateFormatter.ts` | Add `abstract class DateFormatterConfiguration` |
| `app/modules/todo/repositories/todosRepository.ts` | Add `abstract class ToDosRepositoryConfiguration` |
| `app/modules/shared/composables/useSharedServices.ts` | Call `useRuntimeConfig()` at root; add `DateFormatterConfiguration` registration via `toDynamicValue` |
| `app/modules/todo/composables/useTodoServices.ts` | Call `useRuntimeConfig()` at root; add `ToDosRepositoryConfiguration` registration via `toDynamicValue` |
| `app/modules/shared/services/dateFormatterImpl.ts` | Replace `AppPublicRuntimeConfig` with `DateFormatterConfiguration` |
| `app/modules/todo/repositories/todosRepositoryImpl.ts` | Replace `AppPublicRuntimeConfig` with `ToDosRepositoryConfiguration` |
| `app/modules/shared/test/unit/dateFormatterImpl.test.ts` | Replace `AppPublicRuntimeConfig` mock with `DateFormatterConfiguration` object literal |