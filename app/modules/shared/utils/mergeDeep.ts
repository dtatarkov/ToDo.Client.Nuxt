export function mergeDeep<T extends Record<string, any>>(target: T, source: Partial<T>): T
{
  const result = { ...target };

  for (const key in source)
  {
    const sourceElement = source[key];
    const resultElement = result[key];

    if (sourceElement && typeof sourceElement === 'object' && !Array.isArray(sourceElement) && sourceElement.constructor === Object)
    {
      (result as any)[key] = mergeDeep(resultElement || {}, sourceElement);
    }
    else
    {
      (result as any)[key] = sourceElement;
    }
  }

  return result;
}