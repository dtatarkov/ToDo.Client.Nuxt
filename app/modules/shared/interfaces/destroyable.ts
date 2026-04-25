export abstract class Destroyable
{
  static isDestroyable(obj: any): obj is Destroyable
  {
    return obj && typeof obj.destroy === 'function';
  }

  abstract destroy(): void;
}