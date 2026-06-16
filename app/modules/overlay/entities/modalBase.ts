import { Modal, type ModalConfiguration } from "./modal";
import type { ModalButtonConfirmConfigurator } from './modalButtonConfirmConfigurator';
import { ModalButtonConfirmConfiguratorBase } from './modalButtonConfirmConfiguratorBase';
import VModal from '../components/VModal.vue';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { InitializationOnlyException } from '@/modules/shared/exceptions/initializationOnlyException';
import type { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import type { Overlay } from './overlay';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import { isDisposable } from '@/modules/shared/utils/isDisposable';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import type { Func } from '@/modules/shared/types/func';
import type { ModalData } from '../types/modalData';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import type { MessagesService } from '@/modules/shared/services/messagesService';

export class ModalBase<Content extends UIElement> extends Modal<Content>
{
  private overlay: Overlay | undefined;
  private data: ModalData;

  private buttons: Array<ButtonGeneral>;
  private disposeToken = new DisposeToken();
  private onCloseFn = () => this.close();

  private children = {
    content: () => this.content?.vnode,
    controls: () => this.buttons.map(control => control.vnode)
  };

  readonly key = getUniqueId('modal');
  readonly content: Content;
  readonly buttonConfirm: ButtonGeneral | undefined;
  readonly buttonCancel: ButtonGeneral | undefined;

  constructor(
    private buttonsFactory: ButtonsFactory,
    private messagesService: MessagesService,
    configuration: ModalConfiguration<Content>,
  )
  {
    super();

    this.data = shallowReactive({
      title: configuration.title,
      description: configuration.description ?? '',
      isDisabled: false,
    });

    this.content = configuration.content;

    this.buttonConfirm = this.createButtonConfirm(configuration.buttonConfirm);
    this.buttonCancel = this.createButtonCancel(configuration.buttonCancel);

    this.buttons = this.collectButtons(this.buttonConfirm, this.buttonCancel);
  }

  get title()
  {
    return this.data.title;
  }

  get description()
  {
    return this.data.description;
  }

  get vnode()
  {
    const props = {
      ...this.data,

      onClose: this.onCloseFn,
    };

    return h(VModal, props, this.children);
  }

  override enable()
  {
    this.disposeToken.assertNotDisposed();
    this.data.isDisabled = false;

    this.buttons.forEach(control =>
      control.enable());
  }

  override disable()
  {
    this.disposeToken.assertNotDisposed();
    this.data.isDisabled = true;

    this.buttons.forEach(control =>
      control.disable());
  }

  override close()
  {
    this.overlay?.removeElement(this);
    this[Symbol.dispose]();
  }

  override[Symbol.dispose](): void
  {
    if (this.disposeToken.isDisposed)
    {
      return;
    }

    this.disposeContent();
    this.disposeControls();
    this.disposeToken[Symbol.dispose]();
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

  private createButtonConfirm(setupFn?: Func<ButtonGeneral, [ModalButtonConfirmConfigurator]>): ButtonGeneral | undefined
  {
    if (!setupFn)
    {
      return undefined;
    }

    const confirmButtonConfigurator = new ModalButtonConfirmConfiguratorBase(this.buttonsFactory.createButtonGeneral(), this.messagesService);
    const buttonConfirm = setupFn(confirmButtonConfigurator);
    const buttonConfirmCommand = buttonConfirm.getCommand();

    if (buttonConfirmCommand)
    {
      this.setupCommandTracking(buttonConfirmCommand);
    }

    return buttonConfirm;
  }

  private createButtonCancel(isAllowed?: boolean): ButtonGeneral | undefined
  {
    if (isAllowed !== true)
    {
      return undefined;
    }

    const buttonCancel = this.buttonsFactory.createButtonGeneral();
    buttonCancel.title = this.messagesService.getMessage('button.cancel');

    buttonCancel.onClick(this.onCloseFn, this.disposeToken);

    return buttonCancel;
  }

  private disposeContent()
  {
    if (isDisposable(this.content))
    {
      this.content[Symbol.dispose]();
    }
  }

  private setupCommandTracking(command: AsyncCommand)
  {
    command.onIdle(() =>
    {
      this.enable();
    }, this.disposeToken);

    command.onExecuting(() =>
    {
      this.disable();
    }, this.disposeToken);

    command.onExecuted(() =>
    {
      this.close();
    }, this.disposeToken);
  }

  private disposeControls()
  {
    for (const control of this.buttons)
    {
      if (isDisposable(control))
      {
        control[Symbol.dispose]();
      }
    }

    this.buttons = [];
  }

  private collectButtons(...buttons: (ButtonGeneral | undefined)[]): ButtonGeneral[]
  {
    const result = new Array<ButtonGeneral>();

    for (const button of buttons)
    {
      if (button)
      {
        result.push(button);
      }
    }

    return result;
  }
}
