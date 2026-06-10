import { Modal } from "./modal";
import type { ModalConfigurator } from './modalConfigurator';
import type { ModalConfirmButtonConfigurator } from './modalConfirmButtonConfigurator';
import { ModalConfirmButtonConfiguratorBase } from './modalConfirmButtonConfiguratorBase';
import VModal from '../components/VModal.vue';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { Destroyable } from '@/modules/shared/interfaces/destroyable';
import { DestroyToken } from '@/modules/shared/entities/destroyToken';
import { InitializationOnlyException } from '@/modules/shared/exceptions/initializationOnlyException';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import type { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import type { Overlay } from './overlay';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import { InitializationToken } from '@/modules/shared/entities/initializationToken';
import { clearArray } from '@/modules/shared/utils/clearArray';
export class ModalBase extends Modal implements ModalConfigurator
{
  private overlay: Overlay | undefined;
  private content: UIElement | undefined;
  private confirmButton: UIElement | undefined;
  private cancelButton: UIElement | undefined;
  private readonly controls: UIElement[] = [];

  private destroyToken = new DestroyToken();
  private initializationToken = new InitializationToken();

  private data = shallowReactive({
    title: '',
    description: '',
    isDisabled: false,
  });

  readonly key = getUniqueId('modal');

  constructor(
    private buttonsFactory: ButtonsFactory,
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
      content: () => this.content?.vnode,
      controls: () => this.controls.map(control => control.vnode)
    });
  }

  setTitle(title: string): this
  {
    this.initializationToken.assertNotInitialized();
    this.data.title = title;

    return this;
  }

  setDescription(description: string): this
  {
    this.initializationToken.assertNotInitialized();
    this.data.description = description;

    return this;
  }

  setContent(content: UIElement): this
  {
    this.initializationToken.assertNotInitialized();

    if (this.content)
    {
      throw new InitializationOnlyException('content');
    }

    this.content = content;

    return this;
  }

  addButtonConfirm(command: AsyncCommand): ModalConfirmButtonConfigurator
  {
    this.initializationToken.assertNotInitialized();

    if (this.confirmButton)
    {
      throw new InitializationOnlyException('confirm button');
    }

    const button = this.buttonsFactory.createButtonGeneral();

    const confirmButtonConfigurator = new ModalConfirmButtonConfiguratorBase(
      button,
      command,
      this,

      () =>
      {
        this.confirmButton = button;
        this.addControl(button);
        return this;
      },
    );

    return confirmButtonConfigurator;
  }

  addButtonCancel(): this
  {
    this.initializationToken.assertNotInitialized();

    if (this.cancelButton)
    {
      throw new InitializationOnlyException('cancel button');
    }

    const button = this.buttonsFactory.createButtonGeneral();
    button.title = 'Отменить';

    button.on({
      click: () => this.close(),
    });

    this.cancelButton = button;
    this.addControl(button);

    return this;
  }

  init(): Modal
  {
    this.initializationToken.assertNotInitialized();

    if (!this.content)
    {
      throw new Error('Content must be set before getModal');
    }

    this.initializationToken.initialize();

    return this;
  }

  override enable()
  {
    this.destroyToken.assertNotDestroyed();
    this.data.isDisabled = false;
  }

  override disable()
  {
    this.destroyToken.assertNotDestroyed();
    this.data.isDisabled = true;
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
      throw new InitializationOnlyException('overlay');
    }

    this.overlay = overlay;
  }

  private destroy()
  {
    if (this.destroyToken.isDestroyed)
    {
      return;
    }

    this.overlay?.removeElement(this);
    this.destroyContent();
    this.destroyControls();
    this.destroyToken.destroy();
  }

  private destroyContent()
  {
    if (this.content && Destroyable.isDestroyable(this.content))
    {
      this.content.destroy();
    }

    this.content = undefined;
  }

  private destroyControls()
  {
    for (const control of this.controls)
    {
      if (Destroyable.isDestroyable(control))
      {
        control.destroy();
      }
    }

    clearArray(this.controls);
  }

  private addControl(control: UIElement)
  {
    this.controls.unshift(control);
  }
}
