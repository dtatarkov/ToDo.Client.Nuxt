# SSR Payload Decorator Refactoring Plan

## Overview
Refactor the `@ssrPayload` decorator into an `SSRLoader` service pattern using a composable.

## Tasks

### 1. Create SSRLoader Interface
- Location: `packages/ssr/src/services/ssrLoader.ts`
- Define `SSRLoader` interface with single method: `load<T>(key: string, loadFn: Func<T>): T`
- `loadFn` takes no parameters (called without args)

### 2. Create useSSRLoader Composable (Implementation)
- Location: `apps/client/app/composables/useSSRLoader.ts`
- Implement the `SSRLoader` interface as a composable
- Uses `useNuxtApp()` internally
- Handle SSR, hydration, and client-side scenarios

### 3. Register SSRLoader Service
- Location: `apps/client/app/composables/useAppServices.ts`
- Bind `SSRLoader` to the `useSSRLoader` composable

### 4. Update ToDosRepositoryImpl
- Location: `apps/client/app/modules/todo/repositories/todosRepositoryImpl.ts`
- Replace `@ssrPayload('todos')` decorator with `SSRLoader.load()` call
- Inject `SSRLoader` via constructor

### 5. Update SSR Package Exports
- Location: `packages/ssr/src/index.ts`
- Export the new `SSRLoader` interface
- Remove old `ssrPayload` export

## Benefits
- Better testability
- More flexible dependency injection
- Easier to mock in tests
- Composable pattern fits Nuxt's architecture
