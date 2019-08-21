//=================================================================================
//      Step one
//=================================================================================
import React, { useReducer } from 'react';
//unique identify for alert
import uuid from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import {
    SET_ALERT, 
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    //alert object
    const initialState = [];

    //Dispatch from Reducer with Reducer Hook
    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set Alert
    const setAlert = (msg, type, timeout = 5000) => {
        //generate random id
        const id = uuid.v4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        });

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id}), timeout)
    }

    return (
        <AlertContext.Provider
        //*** */anything we want to access from other components (state, action)
        value={{
            alerts: state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState; //import and wrap everything in App.js
