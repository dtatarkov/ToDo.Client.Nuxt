import { ModalViewmodel } from "../interfaces/modalViewmodel";
import VModal from '../components/VModal.vue';
import { EventBusBase } from '@/modules/shared/entities/eventBusBase';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import { Destroyable } from '@/modules/shared/interfaces/destroyable';

export class ModalViewmodelImpl extends ModalViewmodel
{
  #data = {
    title: '',
    description: '',
  };

  #children = {
    content: <Viewmodel | undefined>undefined
  };

  readonly key = getUniqueId('modal');

  readonly component = {
    setup: () =>
    {
      return () => h(VModal, { modal: this });
    }
  };

  readonly controls = new Array<Viewmodel>();

  readonly onClose = new EventBusBase();

  get title()
  {
    return this.#data.title;
  }

  set title(value)
  {
    this.#data.title = value;
  }

  get description()
  {
    return this.#data.description;
  }

  set description(value)
  {
    this.#data.description = value;
  }

  get content()
  {
    return this.#children.content;
  }

  set content(content)
  {
    this.#children.content = content;
  }

  close()
  {
    this.onClose.emit();
    this.onClose.destroy();

    if (Destroyable.isDestroyable(this.content))
    {
      this.content.destroy();
    }

    for (const control of this.controls)
    {
      if (Destroyable.isDestroyable(control))
      {
        control.destroy();
      }
    }
  }
}
