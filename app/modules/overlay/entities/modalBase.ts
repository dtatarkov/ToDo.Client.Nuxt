import { Modal } from "../interfaces/modal";
import VModal from '../components/VModal.vue';
import { EventBusBase } from '@/modules/shared/entities/eventBusBase';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { UIElement } from '@/modules/uikit/interfaces/uiElement';

export class ModalBase extends Modal
{
  #data = {
    title: '',
    description: '',
  };

  #children = {
    content: <UIElement | undefined>undefined
  };

  readonly key = getUniqueId('modal');

  readonly component = {
    setup: () =>
    {
      return () => h(VModal, { modal: this });
    }
  };

  readonly controls = new Array<UIElement>();

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
  }
}
