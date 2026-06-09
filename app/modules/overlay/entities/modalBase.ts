import { Modal } from "./modal";
import VModal from '../components/VModal.vue';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { Destroyable } from '@/modules/shared/interfaces/destroyable';
import { DestroyToken } from '@/modules/shared/entities/destroyToken';
import type { Overlay } from './overlay';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import type { ModalConfirmButtonConfigurator } from './modalConfirmButtonConfigurator';
import { ModalConfirmButtonConfiguratorBase } from './modalConfirmButtonConfiguratorBase';

export class ModalBase<Content extends UIElement> extends Modal<Content>
{
  private overlay: Overlay | undefined;
  private controls = shallowReactive(new Array<UIElement>());

  protected destroyToken = new DestroyToken();

  protected data = shallowReactive({
    title: '',
    description: '',
    isDisabled: false,
  });

  protected children = shallowReactive({
    content: <Content | undefined>undefined
  });

  readonly key = getUniqueId('modal');

  constructor(
    private buttonsFactory: ButtonsFactory
  )
  {
    super();
  }

  get vnode()
  {
    return h(VModal, {
      title: this.data.title,
      description: this.data.description,
      isDismissible: !this.data.isDisabled
    }, {
      content: () => this.children.content ? this.children.content.vnode : undefined,
      controls: () => this.controls.map(control => control.vnode)
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

  addButtonConfirm(command: AsyncCommand): ModalConfirmButtonConfigurator<Content>
  {
    const button = this.buttonsFactory.createButtonGeneral();

    return new ModalConfirmButtonConfiguratorBase(
      button,
      command,
      this,
      (btn) => this.appendControl(btn),
      () => this.enable(),
      () => this.disable(),
    );
  }

  addButtonCancel(): ModalBase<Content>
  {
    const button = this.buttonsFactory.createButtonGeneral();
    button.title = 'Отменить';

    button.on({
      click: () => this.close()
    });

    this.appendControl(button);

    return this;
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

  private enable()
  {
    this.destroyToken.assertNotDestroyed();
    this.data.isDisabled = false;
  }

  private disable()
  {
    this.destroyToken.assertNotDestroyed();
    this.data.isDisabled = true;
  }

  private appendControl(control: UIElement): void
  {
    this.controls.push(control);
  }

  private handleDestroy(): void
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


