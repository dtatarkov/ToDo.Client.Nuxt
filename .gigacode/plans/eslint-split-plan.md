# ESLint Config Split Plan

## Overview
Split the current monolithic eslint config into two separate configs:
- **base**: For Nuxt applications
- **library**: For packages (extends base)

## Current State
- Single `eslint.config.ts` in `@client/eslint` package
- Used by both Nuxt app and packages (datetime)

## Target State

### 1. Create Base Config
- File: `packages/eslint/configs/base.ts`
- Contains the rules specified by user
- Exports `base` config object

### 2. Create Library Config  
- File: `packages/eslint/configs/library.ts`
- Extends base config
- Adds library-specific rules (if any)
- Exports `library` config object

### 3. Update Main Export
- File: `packages/eslint/eslint.config.ts`
- Re-export both `base` and `library` configs
- Keep backward compatibility if needed

### 4. Update Package Exports
- File: `packages/eslint/package.json`
- Add exports field to make configs accessible

### 5. Update Nuxt App
- File: `apps/client/eslint.config.mjs`
- Import and use `@client/eslint/configs/base` instead of root config

### 6. Update Packages
- File: `packages/datetime/eslint.config.mjs`
- Import and use `@client/eslint/configs/library` instead of root config

## Files to Create/Modify

### Create
- `packages/eslint/configs/base.ts`
- `packages/eslint/configs/library.ts`

### Modify
- `packages/eslint/eslint.config.ts`
- `packages/eslint/package.json`
- `apps/client/eslint.config.mjs`
- `packages/datetime/eslint.config.mjs`

## Testing
- Run linting to ensure configs work correctly
- Verify both base and library configs are accessible
