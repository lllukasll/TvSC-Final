import { Credentials } from '../models/credentials';
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface State {
    isAuthenticated: boolean;
    user: Credentials | null;
    errorMessage: string | null;
    logoutErrorMessage: string | null;
    loggedUser: any;
    changePasswordError: string;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    loggedUser: null,
    logoutErrorMessage: null,
    changePasswordError: null
};

export const getAuthError = (state: State) => state.errorMessage;
export const getLoggedUser = (state: State) => state.loggedUser;
export const getAuthState = (state: State) => state.isAuthenticated;
export const getChangePasswordError = (state: State) => state.changePasswordError;

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                loggedUser: action.payload,
                isAuthenticated: true,
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload.error
            };
          }
        case AuthActionTypes.SIGNUP_SUCCESS: {
            return {
                ...state,
                errorMessage: null
            };
        }
        case AuthActionTypes.SIGNUP_FAILURE: {
            return {
                ...state,
                isAuthenticated: false,
                loggedUser: null,
                errorMessage: action.payload.error
            };
        }
        case AuthActionTypes.GET_USER_BY_COOKIE_SUCCESS: {
          return {
            ...state,
            isAuthenticated: true,
            errorMessage: null,
            loggedUser: action.payload
          };
        }
        case AuthActionTypes.GET_USER_BY_COOKIE_FAILURE: {
          return {
            ...state,
            isAuthenticated: false,
            loggedUser: null
          };
        }
        case AuthActionTypes.LOGOUT_SUCCESS: {
          return initialState;
        }
        case AuthActionTypes.LOGOUT_FAILURE: {
          return {
            ...state,
            logoutErrorMessage: action.payload
          };
        }
        case AuthActionTypes.CHANGE_PASSWORD_FAILURE: {
          return {
            ...state,
            changePasswordError: action.payload
          };
        }
        case AuthActionTypes.CHANGE_PASSWORD_SUCCESS: {
          return {
            ...state,
            changePasswordError: null
          };
        }
        default: {
            return state;
        }
    }
}
