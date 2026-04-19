export abstract class OverlayService
{
  abstract createModalBase(): Modal;
  abstract createModalAdd(): ModalConfirm;
  abstract createModalEdit(): ModalConfirm;
  abstract getElements(): Observable<OverlayElement[]>;
}