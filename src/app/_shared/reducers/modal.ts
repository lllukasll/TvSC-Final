import { LOGIN_MODAL_OPEN, REGISTER_MODAL_OPEN, CLOSE_MODAL, ModalActions } from '../actions/modal';

export interface State {
  loginModalOpened: boolean;
  registerModalOpened: boolean;
}

const initialState: State = {
  loginModalOpened: false,
  registerModalOpened: false
};

export function reducer(state: State = initialState, action: ModalActions) {
  switch (action.type) {
    case LOGIN_MODAL_OPEN:
      return { ...initialState, loginModalOpened: true };
    case REGISTER_MODAL_OPEN:
      return { ...initialState, registerModalOpened: true };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export const loginModalOpened = (state: State) => state.loginModalOpened;
export const registerModalOpened = (state: State) => state.registerModalOpened;
