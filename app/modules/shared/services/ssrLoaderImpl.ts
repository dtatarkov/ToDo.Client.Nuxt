import { SSRLoader } from '../interfaces/ssrLoader';

enum SSRLoaderState
{
  initial = 0,
  initialized = 2,
}

export class SSRLoaderImpl extends SSRLoader
{
  private _dataStates = new Map<string, SSRLoaderState>;

  override async loadAsync<T>(key: string, handler: () => Promise<T>): Promise<T>
  {
    let result: T;

    const state = this._dataStates.get(key) ?? SSRLoaderState.initial;

    if (state === SSRLoaderState.initial)
    {
      const response = await useAsyncData(key, handler);
      result = response.data.value as T;

      this._dataStates.set(key, SSRLoaderState.initialized);
    }
    else
    {
      result = await handler();
    }

    return result;
  }
}