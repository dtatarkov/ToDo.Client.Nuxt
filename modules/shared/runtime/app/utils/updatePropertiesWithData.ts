export function updatePropertiesWithData(object: object, data: Record<string, any>): void {
  Object.keys(data).forEach(key => {
    if(key in object)
    {
      (object as any)[key] = data[key];
    }
  });
}