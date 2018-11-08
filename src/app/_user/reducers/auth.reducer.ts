import { Credentials } from '../models/credentials';
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface State {
    isAuthenticated: boolean;
    user: Credentials | null;
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};


export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect email and/or password.'
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
                errorMessage: 'Error message'
            };
        }
        case AuthActionTypes.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
