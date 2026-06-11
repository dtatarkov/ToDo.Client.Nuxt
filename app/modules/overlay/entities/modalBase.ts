import { Modal } from "./modal";
import type { ModalConfigurator } from './modalConfigurator';
import type { ModalButtonConfirmConfigurator } from './modalButtonConfirmConfigurator';
import { ModalButtonConfirmConfiguratorBase } from './modalButtonConfirmConfiguratorBase';
import VModal from '../components/VModal.vue';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { InitializationOnlyException } from '@/modules/shared/exceptions/initializationOnlyException';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import type { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import type { Overlay } from './overlay';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import { InitializationToken } from '@/modules/shared/entities/initializationToken';
import { clearArray } from '@/modules/shared/utils/clearArray';
import { isDisposable } from '@/modules/shared/utils/isDisposable';
import { ModalButtonConfirm } from './modalButtonConfirm';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';

export class ModalBase extends Modal implements ModalConfigurator
{
  private overlay: Overlay | undefined;
  private content: UIElement | undefined;
  private confirmButton: ButtonGeneral | undefined;
  private cancelButton: ButtonGeneral | undefined;
  private readonly controls: UIElement[] = [];

  private disposeToken = new DisposeToken();
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

  addButtonConfirm(command: AsyncCommand): ModalButtonConfirmConfigurator
  {
    this.initializationToken.assertNotInitialized();

    if (this.confirmButton)
    {
      throw new InitializationOnlyException('confirm button');
    }

    const button = new ModalButtonConfirm(this);

    const confirmButtonConfigurator = new ModalButtonConfirmConfiguratorBase(
      button,
      command,

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
    this.disposeToken.assertNotDisposed();
    this.data.isDisabled = false;
    this.confirmButton?.enable();
    this.cancelButton?.enable();
  }

  override disable()
  {
    this.disposeToken.assertNotDisposed();
    this.data.isDisabled = true;
    this.confirmButton?.disable();
    this.cancelButton?.disable();
  }

  override close()
  {
    this.dispose();
  }

  override setOverlay(overlay: Overlay)
  {
    this.disposeToken.assertNotDisposed();

    if (this.overlay)
    {
      throw new InitializationOnlyException('overlay');
    }

    this.overlay = overlay;
  }

  private dispose()
  {
    if (this.disposeToken.isDisposed)
    {
      return;
    }

    this.overlay?.removeElement(this);
    this.disposeContent();
    this.disposeControls();
    this.disposeToken[Symbol.dispose]();
  }

  private disposeContent()
  {
    if (isDisposable(this.content))
    {
      this.content[Symbol.dispose]();
    }

    this.content = undefined;
  }

  private disposeControls()
  {
    for (const control of this.controls)
    {
      if (isDisposable(control))
      {
        control[Symbol.dispose]();
      }
    }

    clearArray(this.controls);
  }

  private addControl(control: UIElement)
  {
    this.controls.unshift(control);
  }
}
