import { ModalViewmodel } from "../interfaces/modalViewmodel";
import VModal from '../components/VModal.vue';
import { EventBusBase } from '@/modules/shared/entities/eventBusBase';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import { Destroyable } from '@/modules/shared/interfaces/destroyable';
import { DestroyTokenBase } from '@/modules/shared/entities/destroyTokenBase';

export class ModalViewmodelImpl extends ModalViewmodel
{
  protected destroyToken = new DestroyTokenBase();

  protected data = {
    title: '',
    description: '',
  };

  protected children = {
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
    this.destroyToken.assertNotDestroyed();
    return this.data.title;
  }

  set title(value)
  {
    this.destroyToken.assertNotDestroyed();
    this.data.title = value;
  }

  get description()
  {
    this.destroyToken.assertNotDestroyed();
    return this.data.description;
  }

  set description(value)
  {
    this.destroyToken.assertNotDestroyed();
    this.data.description = value;
  }

  get content()
  {
    this.destroyToken.assertNotDestroyed();
    return this.children.content;
  }

  set content(content)
  {
    this.destroyToken.assertNotDestroyed();
    this.children.content = content;
  }

  close()
  {
    if (this.destroyToken.isDestroyed)
    {
      return;
    }

    this.handleClose();
    this.destroyToken.destroy();
  }

  protected handleClose(): void
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
