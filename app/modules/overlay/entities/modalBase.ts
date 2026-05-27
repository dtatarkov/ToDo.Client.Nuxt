import { Modal } from "./modal";
import VModal from '../components/VModal.vue';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import { Destroyable } from '@/modules/shared/interfaces/destroyable';
import { DestroyTokenImpl } from '@/modules/shared/entities/destroyTokenImpl';
import type { Overlay } from './overlay';

export class ModalBase<Content extends Viewmodel> extends Modal<Content>
{
  private overlay: Overlay | undefined;

  protected destroyToken = new DestroyTokenImpl();

  protected data = shallowReactive({
    title: '',
    description: '',
    isDisabled: false,
  });

  protected controls = shallowReactive(new Array<Viewmodel>());

  protected children = shallowReactive({
    content: <Content | undefined>undefined
  });

  readonly key = getUniqueId('modal');

  get vnode()
  {
    return h(VModal, {
      title: this.data.title,
      description: this.data.description,
      isDismissible: !this.data.isDisabled
    }, {
      content: () => this.children.content ? h(this.children.content.component, { key: this.children.content.key }) : undefined,
      controls: () => this.controls.map(control => h(control.component, { key: control.key }))
    });
  }

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
    this.destroyToken.assertNotDestroyed();
    return this.data.isDisabled;
  }

  set isDisabled(value)
  {
    this.destroyToken.assertNotDestroyed();
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

  override close()
  {
    this.destroy();
  }

  override setOverlay(overlay: Overlay)
  {
    this.destroyToken.assertNotDestroyed();

    if (this.overlay)
    {
      throw new Error('Overlay change is forbidden');
    }

    this.overlay = overlay;
  }

  destroy()
  {
    if (this.destroyToken.isDestroyed)
    {
      return;
    }

    this.handleDestroy();
    this.destroyToken.destroy();
  }

  protected handleDestroy(): void
  {
    this.overlay?.removeElement(this);

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
