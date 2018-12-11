import { Action } from '@ngrx/store';

export const LOGIN_MODAL_OPEN = 'LOGIN_MODAL_OPEN';
export const REGISTER_MODAL_OPEN = 'REGISTER_MODAL_OPEN';
export const COMMENT_MODAL_OPEN = 'COMMENT_MODAL_OPEN';
export const CONFIRM_MODAL_OPEN = 'CONFIRM_MODAL_OPEN';
export const CHANGE_PASSWORD_MODAL_OPEN = 'CHANGE_PASSWORD_MODAL_OPEN';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export class LoginModalOpen implements Action {
  readonly type = LOGIN_MODAL_OPEN;
}

export class RegisterModalOpen implements Action {
  readonly type = REGISTER_MODAL_OPEN;
}

export class CommentModalOpen implements Action {
  readonly type = COMMENT_MODAL_OPEN;
}

export class ConfirmModalOpen implements Action {
  readonly type = CONFIRM_MODAL_OPEN;
}

export class ChangePasswordModalOpen implements Action {
  readonly type = CHANGE_PASSWORD_MODAL_OPEN;
}

export class CloseModal implements Action {
  readonly type = CLOSE_MODAL;
}

export type ModalActions
  = LoginModalOpen
  | ConfirmModalOpen
  | RegisterModalOpen
  | CommentModalOpen
  | ChangePasswordModalOpen
  | CloseModal;
