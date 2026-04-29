import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import { InputViewmodel } from "../../../interfaces/inputViewmodel";
import type { Action } from '@/modules/shared/types/action';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';

export abstract class InputViewmodelComposedBase<V> extends InputViewmodel<V>
{
  private idInternal = ref('');
  private nameInternal = ref('');

  protected abstract children: Record<string, InputViewmodel>;
  protected dataSetters: Record<string, Action<[any]>> = {};

  readonly key = getUniqueId('input-element-composed');

  readonly component = {
    setup: () =>
    {
      const props = {
        class: 'flex gap-1'
      };

      const children = Object
        .values(this.children)
        .map(child => h(child.component));

      return () => h('div', props, children);
    }
  };

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
    });
  }

  get id(): string
  {
    return this.idInternal.value;
  }

  set id(newId)
  {
    this.idInternal.value = newId;

    Object
      .entries(this.children)
      .forEach(([childName, child]) =>
      {
        child.id = this.stringsService.postfixNotEmpty(newId, childName.toLowerCase());
      });
  }

  get name(): string
  {
    return this.nameInternal.value;
  }

  set name(value: string)
  {
    this.nameInternal.value = value;

    Object
      .entries(this.children)
      .forEach(([childName, child]) =>
      {
        child.name = this.stringsService.postfixNotEmpty(value, childName.toLowerCase(), '--');
      });
  }

  override disable(): void
  {
    Object
      .values(this.children)
      .forEach(child => child.disable());
  }

  override enable(): void
  {
    Object
      .values(this.children)
      .forEach(child => child.enable());
  }
}