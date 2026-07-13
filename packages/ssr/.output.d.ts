declare module "src/services/ssrLoader" {
    import type { Func } from '@client/shared';
    /**
     * Service for loading data with SSR payload caching.
     *
     * On the server: executes the load function and stores the result in the payload.
     * During hydration: returns the cached payload value without executing the function.
     * On the client: executes the function normally.
     */
    export abstract class SSRLoader {
        /**
         * Loads data using the provided function, with SSR payload caching.
         *
         * @param key - Key used to store/retrieve the data in the payload.
         * @param loadFn - Function that loads the data (no arguments).
         * @returns The loaded data.
         */
        abstract load<T>(key: string, loadFn: Func<T>): T;
    }
}
declare module "src/index" {
    export { SSRLoader } from "src/services/ssrLoader";
}
