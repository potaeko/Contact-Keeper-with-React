//=================================================================================
//      Step one
//=================================================================================
import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
        REGISTER_SUCCESS,
        REGISTER_FAIL,
        USER_LOADED,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT,
        CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user:null,
        error: null
    };

    //Dispatch from Reducer with Reducer Hook
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load User, check which user is login get data

    //Register User, sign up user get token back

    //Login User, get the token

    //Logout, destroy the token

    //Clear Error, clear out any error in state

    return (
        <AuthContext.Provider
        //*** */anything we want to access from other components (state, action)
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            token: state.user,
            error: state.error,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState; //import and wrap everything in App.js
