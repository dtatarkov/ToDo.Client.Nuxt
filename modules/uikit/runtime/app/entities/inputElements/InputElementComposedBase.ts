import { InputElement } from "../../interfaces/inputElement";
import type { StringsService } from "@shared/interfaces/stringsService";

export abstract class InputElementComposedBase<V> extends InputElement<V>
{
  #id = ref('');

  protected abstract children: Record<string, InputElement>
  protected dataSetters: Record<string, Action<[any]>> = {}

  readonly key = getUniqueId('input-element-composed');

  readonly component = {
    setup: () =>
    {
      const props = {
        class: 'flex gap-1'
      }

      const children = Object
        .values(this.children)
        .map(child => h(child.component));

      return () => h('div', props, children);
    }
  }

  constructor(
    protected stringsService: StringsService
  )
  {
    super();

    Object.assign(this.dataSetters, {
      id: (id: string) =>
      {
        this.id = id;
      },

      value: (value: V) =>
      {
        this.value = value;
      }
    })
  }

  get id(): string
  {
    return this.#id.value;
  }

  set id(newId)
  {
    this.#id.value = newId;

    Object
      .entries(this.children)
      .forEach(([childName, child]) =>
      {
        child.id = this.stringsService.postfixNotEmpty(newId, childName.toLowerCase());
      });
  }
}