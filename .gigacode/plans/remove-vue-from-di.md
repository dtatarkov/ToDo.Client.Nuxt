# Remove Vue Dependency from DI Package

## Current State
- DI package (`@packages/di`) declares Vue as a peer dependency in package.json
- DI package contains 3 source files: dependency.ts, servicesContainer.ts, serviceIdentifier.ts
- None of the source files actually use Vue functionality
- Vue is only needed in SSR package for Nuxt's payload system

## Action Plan

1. Remove Vue from peerDependencies in `packages/di/package.json`
2. Remove Vue from dependencies in `packages/ssr/package.json` (if not used)
3. Update any references to Vue in DI package code (if any)
4. Verify the DI package still builds and works correctly

## Files to Modify
- `packages/di/package.json` - Remove "vue" from peerDependencies
- `packages/ssr/package.json` - Verify if Vue is actually needed there

## Verification Steps
- Run type checking on the DI package
- Verify dependent packages can still use DI without Vue
- Check if any tests need to be updated
