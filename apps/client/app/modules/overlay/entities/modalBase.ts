import { h, shallowReactive } from 'vue';
import type { Modal, ModalConfiguration } from "./modal";
import type { ModalButtonConfirmConfigurator } from './modalButtonConfirmConfigurator';
import { ModalButtonConfirmConfiguratorBase } from './modalButtonConfirmConfiguratorBase';
import { getUniqueId, isDisposable } from '@client/shared';
import type { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import type { ModalsStore } from './modalsStore';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import type { Func, AsyncCommand } from '@client/shared';
import { OverlayElementBase } from './overlayElementBase';
import type { MessagesService } from '@client/infrastructure-messages';
import { VModal } from '@client/ui-vue';
import type { ModalDataFull } from '@client/ui-overlay';

export class ModalBase<Content extends UIElement> extends OverlayElementBase<ModalsStore> implements Modal<Content>
{
  private data: ModalDataFull;
  private buttons: Array<ButtonGeneral>;

  private state = shallowReactive({
    isDisabled: false,
  });

  private children = {
    content: () => this.content?.vnode,
    controls: () => undefined,
  };

  private onCloseFn = () => this.close();

  readonly key = getUniqueId('modal');
  readonly content: Content;
  readonly buttonConfirm: ButtonGeneral | undefined;
  readonly buttonCancel: ButtonGeneral | undefined;

  constructor(
    private buttonsFactory: ButtonsFactory,
    private messagesService: MessagesService,
    store: ModalsStore,
    configuration: ModalConfiguration<Content>,

  )
  {
    super(store);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.data = {
      title: configuration.title,
      description: configuration.description ?? '',
      isDisabled: false,
    };

    this.content = configuration.content;

    this.buttonConfirm = this.createButtonConfirm(configuration.buttonConfirm);
    this.buttonCancel = this.createButtonCancel(configuration.buttonCancel);

    this.buttons = this.collectButtons(this.buttonConfirm, this.buttonCancel);

    this.disposeToken.onDispose(() =>
    {
      this.disposeContent();
      this.disposeControls();
    });
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
      ...this.state,

      onClose: this.onCloseFn,
    };

    return h(VModal, props, this.children);
  }

  enable()
  {
    this.disposeToken.assertNotDisposed();
    this.state.isDisabled = false;

    this.buttons.forEach(control =>
      control.enable());
  }

  disable()
  {
    this.disposeToken.assertNotDisposed();
    this.state.isDisabled = true;

    this.buttons.forEach(control =>
      control.disable());
  }

  override getData()
  {
    return this.data;
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

  private disposeContent()
  {
    if (isDisposable(this.content))
    {
      this.content[Symbol.dispose]();
    }
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
