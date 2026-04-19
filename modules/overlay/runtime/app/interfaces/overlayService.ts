export abstract class OverlayService
{
  abstract createModal(): Modal;
  abstract createAddModal(): ModalConfirm;
  abstract createEditModal(): ModalConfirm;
  abstract getElements(): Observable<OverlayElement[]>;
}