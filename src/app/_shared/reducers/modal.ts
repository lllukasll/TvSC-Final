import { LOGIN_MODAL_OPEN, REGISTER_MODAL_OPEN, CLOSE_MODAL, COMMENT_MODAL_OPEN, CONFIRM_MODAL_OPEN, CHANGE_PASSWORD_MODAL_OPEN, ModalActions } from '../actions/modal';

export interface State {
  loginModalOpened: boolean;
  registerModalOpened: boolean;
  commentModalOpened: boolean;
  confirmModalOpened: boolean;
  changePasswordModalOpened: boolean;
}

const initialState: State = {
  loginModalOpened: false,
  registerModalOpened: false,
  commentModalOpened: false,
  confirmModalOpened: false,
  changePasswordModalOpened: false
};

export function reducer(state: State = initialState, action: ModalActions) {
  switch (action.type) {
    case LOGIN_MODAL_OPEN:
      return { ...initialState, loginModalOpened: true };
    case REGISTER_MODAL_OPEN:
      return { ...initialState, registerModalOpened: true };
    case COMMENT_MODAL_OPEN:
      return { ...initialState, commentModalOpened: true };
    case CONFIRM_MODAL_OPEN:
      return { ...initialState, confirmModalOpened: true};
    case CHANGE_PASSWORD_MODAL_OPEN:
      return { ...initialState, changePasswordModalOpened: true};
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export const loginModalOpened = (state: State) => state.loginModalOpened;
export const registerModalOpened = (state: State) => state.registerModalOpened;
export const commentModalOpened = (state: State) => state.commentModalOpened;
export const confirmModalOpened = (state: State) => state.confirmModalOpened;
export const changePasswordModalOpened = (state: State) => state.changePasswordModalOpened;
