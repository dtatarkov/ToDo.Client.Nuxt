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

  protected data = reactive({
    title: '',
    description: '',
    isDisabled: false,
  });

  protected children = shallowReactive({
    content: <Viewmodel | undefined>undefined
  });

  readonly key = getUniqueId('modal');

  readonly component = {
    setup: () =>
    {
      return () => h(VModal, {
        title: this.data.title,
        description: this.data.description,
        isDismissible: !this.data.isDisabled
      }, {
        content: () => this.children.content ? h(this.children.content.component, { key: this.children.content.key }) : undefined,
        controls: () => this.controls.map(control => h(control.component, { key: control.key }))
      });
    }
  };

  readonly controls = shallowReactive(new Array<Viewmodel>());

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

  get isDisabled()
  {
    return this.data.isDisabled;
  }

  set isDisabled(value)
  {
    this.data.isDisabled = value;
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
