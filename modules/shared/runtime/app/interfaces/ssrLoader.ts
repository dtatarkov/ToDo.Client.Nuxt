export abstract class SSRLoader
{
  abstract loadAsync<T>(key: string, handler: Func<Promise<T>>): Promise<T>;
}