import { OverlayService as OverlayServiceImport } from './app/interfaces/overlayService';
import { Modal as ModalImport } from './app/interfaces/modal';
import { ModalConfirm as ModalConfirmImport } from './app/interfaces/modalConfirm';
import { OverlayElement as OverlayElementImport } from './app/interfaces/overlayElement';

export { };

declare global {
  export type OverlayService = OverlayServiceImport;
  export type Modal = ModalImport;
  export type ModalConfirm = ModalConfirmImport;
  export type OverlayElement = OverlayElementImport;
}