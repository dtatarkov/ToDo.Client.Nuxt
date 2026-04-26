import { SSRLoader } from '../interfaces/ssrLoader';

export class SSRLoaderImpl extends SSRLoader
{
  override async loadAsync<T>(key: string, handler: () => Promise<T>): Promise<T>
  {
    let result: T;

    const nuxt = useNuxtApp();

    if (import.meta.server || nuxt.isHydrating)
    {
      const response = await useAsyncData(key, handler);
      result = response.data.value as T;
    }
    else
    {
      result = await handler();
    }

    return result;
  }
}