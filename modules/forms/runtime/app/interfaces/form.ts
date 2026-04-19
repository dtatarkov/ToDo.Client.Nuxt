export abstract class Form<TEntity extends Record<string, any> = Record<string, any>> extends UIElement
{
  abstract readonly elements: UIElement[];

  abstract getData(): Record<keyof TEntity, any>;
  abstract setData(data: Record<keyof TEntity, any>): void;
  abstract setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>): void;
  abstract submit(): void;
  abstract block(): void;
  abstract unblock(): void;
  abstract use(func: Func<Promise<void>>): Promise<void>;

  abstract readonly onSubmit: Subscribable<Record<keyof TEntity, any>>;
}