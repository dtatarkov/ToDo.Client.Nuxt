export abstract class OverlayService
{
  abstract createModalBase(): Modal;
  abstract createModalAddForm(form: Form): ModalConfirm;
  abstract createModalEditForm(form: Form): ModalConfirm;
  abstract getElements(): Observable<OverlayElement[]>;
}