import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload //set user with response data
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            //save token in localstorage
            localStorage.setItem('token', action.payload.token);
            return {
                ...state, //current state
                ...action.payload, //token
                isAuthenticated: true,
                loading: false // we set true by default
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            //remove token
            localStorage.removeItem('token');
            return {
                ...state,
                token: null, //reset token
                isAuthenticated: false,
                loading: false,
                user: null, //reset user
                error: action.payload //msg payload as REGISTER_FAIL from AuthState
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}