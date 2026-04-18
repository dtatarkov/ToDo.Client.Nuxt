import { SSRLoader } from '@shared/interfaces/ssrLoader';

enum SSRLoaderState
{
  initial     = 0,
  initialized = 2,
}

export class SSRLoaderImpl extends SSRLoader
{
  protected state = SSRLoaderState.initial;

  override async loadAsync<T>(key: string, handler: () => Promise<T>): Promise<T>
  {
    let result: T;

    if (this.state === SSRLoaderState.initial)
    {
      const response = await useAsyncData(key, handler);
      result         = response.data.value as T;

      this.state = SSRLoaderState.initialized;
    }
    else
    {
      result = await handler();
    }

    return result;
  }
}