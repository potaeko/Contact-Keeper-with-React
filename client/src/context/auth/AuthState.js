//=================================================================================
//                          Load User with axios, setAuthToken
//=================================================================================
import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
        REGISTER_SUCCESS,
        REGISTER_FAIL,
        USER_LOADED,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT,
        CLEAR_ERRORS,
        AUTH_ERROR
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    //Dispatch from Reducer with Reducer Hook
    const [state, dispatch] = useReducer(authReducer, initialState);

    //#Step 2, Load User 
    //check which user is login get data, authenticate the token
    const loadUser = async () => {
        //@todo  - load token into global headers
        //if have token, pass in setAuthToken for the header
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try{
            //check if valid user
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED, 
                payload: res.data //actual data
            });
        } catch(err) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    //#Step 1, Register User
    //sign up user get token back, post request to axios routes/users.js
    const register = async formData => {
        //send to the protected route
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //see more info in routes/users.js, res.data will be the token, res.json({ token })
        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            //get token after register
            loadUser();
        }   catch (err) {
            //error from users.js, return res.status(400).json({msg: 'User already exist'});
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        };
    };
    //#Step 3, Login User
    //get the token
    const login = async formData => {
        //send to the protected route
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //see more info in routes/users.js, res.data will be the token, res.json({ token })
        try {
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            //get token after register
            loadUser();
        }   catch (err) {
            //error from users.js, return res.status(400).json({msg: 'User already exist'});
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        };
    };

    //Step 4: Logout
    //destroy the token
    const logout = () => dispatch({ type: LOGOUT });

    //Clear Error
    //clear out any error in state
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        //*** */anything we want to access from other components (state, action)
        //we can see all these state in React tool on Chrome
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState; //import and wrap everything in App.js
//=================================================================================
//                          Register User with axios
//=================================================================================
// import React, { useReducer } from 'react';
// import axios from 'axios';
// import AuthContext from './authContext';
// import authReducer from './authReducer';
// import {
//         REGISTER_SUCCESS,
//         REGISTER_FAIL,
//         USER_LOADED,
//         LOGIN_SUCCESS,
//         LOGIN_FAIL,
//         LOGOUT,
//         CLEAR_ERRORS,
//         AUTH_ERROR
// } from '../types';

// const AuthState = props => {
//     const initialState = {
//         token: localStorage.getItem('token'),
//         isAuthenticated: null,
//         loading: true,
//         user: null,
//         error: null
//     };

//     //Dispatch from Reducer with Reducer Hook
//     const [state, dispatch] = useReducer(authReducer, initialState);

//     //Load User, check which user is login get data
//     const loadUser = () => console.log('loadUser');
        

//     //Register User, sign up user get token back, post request to axios routes/users.js
//     const register = async formData => {
//         //send to the protected route
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         //see more info in routes/users.js, res.data will be the token, res.json({ token })
//         try {
//             const res = await axios.post('/api/users', formData, config);

//             dispatch({
//                 type: REGISTER_SUCCESS,
//                 payload: res.data
//             });
//         }   catch (err) {
//             //error from users.js, return res.status(400).json({msg: 'User already exist'});
//             dispatch({
//                 type: REGISTER_FAIL,
//                 payload: err.response.data.msg
//             });
//         };
//     };
//     //Login User, get the token
//     const login = () => console.log('login');

//     //Logout, destroy the token
//     const logout = () => console.log('loadout');

//     //Clear Error, clear out any error in state
//     const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

//     return (
//         <AuthContext.Provider
//         //*** */anything we want to access from other components (state, action)
//         value={{
//             token: state.token,
//             isAuthenticated: state.isAuthenticated,
//             loading: state.loading,
//             token: state.user,
//             error: state.error,
//             register,
//             loadUser,
//             login,
//             logout,
//             clearErrors
//         }}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthState; //import and wrap everything in App.js

//=================================================================================
//                                  Step 1
//=================================================================================
// import React, { useReducer } from 'react';
// import AuthContext from './authContext';
// import authReducer from './authReducer';
// import {
//         REGISTER_SUCCESS,
//         REGISTER_FAIL,
//         USER_LOADED,
//         LOGIN_SUCCESS,
//         LOGIN_FAIL,
//         LOGOUT,
//         CLEAR_ERRORS
// } from '../types';

// const AuthState = props => {
//     const initialState = {
//         token: localStorage.getItem('token'),
//         isAuthenticated: null,
//         loading: true,
//         user:null,
//         error: null
//     };

//     //Dispatch from Reducer with Reducer Hook
//     const [state, dispatch] = useReducer(authReducer, initialState);

//     //Load User, check which user is login get data

//     //Register User, sign up user get token back

//     //Login User, get the token

//     //Logout, destroy the token

//     //Clear Error, clear out any error in state

//     return (
//         <AuthContext.Provider
//         //*** */anything we want to access from other components (state, action)
//         value={{
//             token: state.token,
//             isAuthenticated: state.isAuthenticated,
//             loading: state.loading,
//             token: state.user,
//             error: state.error,
//         }}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthState; //import and wrap everything in App.js
