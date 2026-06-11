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
import { ModalButtonConfirm } from './modalButtonConfirm';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import type { Func } from '@/modules/shared/types/func';
import type { Button } from '@/modules/uikit/entities/buttons/button';

export class ModalBase extends Modal
{
  private overlay: Overlay | undefined;
  private content: UIElement | undefined;

  private controls: Button[] = [];
  private disposeToken = new DisposeToken();

  private data = shallowReactive({
    title: '',
    description: '',
    isDisabled: false,
  });

  readonly key = getUniqueId('modal');

  constructor(
    private buttonsFactory: ButtonsFactory,
    configuration: ModalConfiguration,
  )
  {
    super();

    this.data.title = configuration.title;
    this.data.description = configuration.description ?? '';
    this.content = configuration.content;

    this.setupButtonConfirm(configuration.buttonConfirm);
    this.setupButtonCancel(configuration.buttonCancel);
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

  override enable()
  {
    this.disposeToken.assertNotDisposed();
    this.data.isDisabled = false;

    this.controls.forEach(control =>
      control.enable());
  }

  override disable()
  {
    this.disposeToken.assertNotDisposed();
    this.data.isDisabled = true;

    this.controls.forEach(control =>
      control.disable());
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

  private setupButtonConfirm(setupFn?: Func<ButtonGeneral, [ModalButtonConfirmConfigurator]>): void
  {
    if (!setupFn)
    {
      return;
    }

    const button = new ModalButtonConfirm(this);
    const confirmButtonConfigurator = new ModalButtonConfirmConfiguratorBase(button);

    this.addControl(setupFn(confirmButtonConfigurator));
  }

  private setupButtonCancel(isAllowed?: boolean): void
  {
    if (isAllowed !== true)
    {
      return;
    }

    const button = this.buttonsFactory.createButtonGeneral();
    button.title = 'Отменить';

    button.on({
      click: () => this.close(),
    });

    this.addControl(button);
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

    this.controls = [];
  }

  private addControl(control: Button)
  {
    this.controls.unshift(control);
  }
}
