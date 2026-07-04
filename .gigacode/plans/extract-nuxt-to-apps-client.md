# Plan: Extract Nuxt Code to apps/client with pnpm Workspaces

## Steps:

1. **Create directory structure**
   - Create `apps/client` directory
   - Create `packages` directory (empty for now)

2. **Move Nuxt application code**
   - Move `app/` directory → `apps/client/app/`
   - Move `public/` directory → `apps/client/public/`
   - Move `i18n/` directory → `apps/client/i18n/`
   - Move configuration files to `apps/client/`:
     - `nuxt.config.ts`
     - `vite.config.ts`
     - `vitest.config.ts`
     - `tsconfig.json`
     - `eslint.config.mjs`
     - `index.d.ts`

3. **Create workspace files**
   - Create root `pnpm-workspace.yaml`
   - Create root `package.json` (monorepo root)
   - Move original `package.json` to `apps/client/package.json`
   - Update `.pnpmrc.yaml` if needed

4. **Update paths and references**
   - Update path aliases in `vite.config.ts` to use relative paths
   - Update `vitest.config.ts` to use relative paths
   - Update `tsconfig.json` references
   - Update Storybook configuration paths if needed

5. **Update root package.json scripts**
   - Point to `apps/client` for Nuxt commands
   - Add workspace scripts

6. **Update .gitignore** if needed

7. **Verify the setup**
   - Run `pnpm install` at root
   - Run `pnpm dev` in apps/client
   - Run tests to ensure everything works