import { Action } from '@ngrx/store';

export const LOGIN_MODAL_OPEN = 'LOGIN_MODAL_OPEN';
export const REGISTER_MODAL_OPEN = 'REGISTER_MODAL_OPEN';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export class LoginModalOpen implements Action {
  readonly type = LOGIN_MODAL_OPEN;
}

export class RegisterModalOpen implements Action {
  readonly type = REGISTER_MODAL_OPEN;
}

export class CloseModal implements Action {
  readonly type = CLOSE_MODAL;
}

export type ModalActions
  = LoginModalOpen
  | RegisterModalOpen
  | CloseModal;
