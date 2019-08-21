
//=================================================================================
//                  Connect with BackEnd mongodb GET,CLEAR,UPDATE CONTACTS
//=================================================================================
import React, { useReducer } from 'react';
import axios from 'axios';
//generate random dummy ID, Mondodb give us id
// import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS, //backend
    CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
    //hard coded data
    const initialState = {
        // contacts:[], we see 'Please add contact from Contacts.js component when reload'
        contacts: null,
        current: null,
        filtered: null,
        error:null
    };
    //Dispatch from Reducer with Reducer Hook
    const [state, dispatch] = useReducer(contactReducer, initialState);
//=================================================================================
//                                  Actions
//=================================================================================
    //Get Contacts
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts');
            //payload with response from database
            dispatch({ 
                type: GET_CONTACTS, 
                payload: res.data 
            });
        } catch(err) { 
            dispatch({ 
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    };

    //Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            //payload with response from database
            dispatch({ 
                type: ADD_CONTACT, 
                payload: res.data //res from database Mongodb
            });
        } catch(err) { 
            dispatch({ 
                type: CONTACT_ERROR,
                payload: err.response.msg
            })

        }
    };

    //Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            
            dispatch({ 
                type: DELETE_CONTACT, 
                payload: id });
        } catch(err) { 
            dispatch({ 
                type: CONTACT_ERROR,
                payload: err.response.msg
            });

        }
    };

     //Update Contact
     const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try {
            //put request for update
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            //payload with response from database
            dispatch({ 
                type: UPDATE_CONTACT, 
                payload: res.data //res from database Mongodb
            });
        } catch(err) { 
            dispatch({ 
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    };

    //Clear Contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };

    //Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    //Clear Current Contact, set back to null
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    
    //Filter Contact
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };
    //Clear Filter
    const clearFilter= () => {
        dispatch({ type: CLEAR_FILTER});
    };

    return (
        //*** */anything we want to access from other components (state, action)
        //we can see all these state in React tool on Chrome
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            error: state.error,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState; //import and wrap everything in App.js

//=================================================================================
//      Creating All the contacts function with uuid before connect mongodb
//=================================================================================
// import React, { useReducer } from 'react';
// //generate random ID
// import uuid from 'uuid';
// import ContactContext from './contactContext';
// import contactReducer from './contactReducer';
// import {
//     ADD_CONTACT,
//     DELETE_CONTACT,
//     SET_CURRENT,
//     CLEAR_CURRENT,
//     UPDATE_CONTACT,
//     FILTER_CONTACTS,
//     CLEAR_FILTER
// } from '../types';

// const ContactState = props => {
//     //hard coded data
//     const initialState = {
//         contacts:[
//             {
//                 id: 1,
//                 name: 'Jill Johnson',
//                 email: 'Jill@gmail.com',
//                 phone: '111-111-1111',
//                 type: 'personal'
//             },
//             {
//                 id: 2,
//                 name: 'Sara Watson',
//                 email: 'sara@gmail.com',
//                 phone: '222-222-2222',
//                 type: 'personal'
//             },
//             {
//                 id: 3,
//                 name: 'Harry White',
//                 email: 'harry@gmail.com',
//                 phone: '333-333-3333',
//                 type: 'professional'
//             },    
//         ],
//         current: null,
//         filtered: null
//     };
//     //Dispatch from Reducer with Reducer Hook
//     const [state, dispatch] = useReducer(contactReducer, initialState);


// //Actions

//     //Add Contact
//     const addContact = contact => {
//         contact.id = uuid.v4();
//         dispatch({ type: ADD_CONTACT, payload: contact })

//     }
//     //Delete Contact
//     const deleteContact = id => {
//         dispatch({ type: DELETE_CONTACT, payload: id })
//     }

//     //Set Current Contact
//     const setCurrent = contact => {
//         dispatch({ type: SET_CURRENT, payload: contact })
//     }

//     //Clear Current Contact, set back to null
//     const clearCurrent = () => {
//         dispatch({ type: CLEAR_CURRENT })
//     }
    
//     //Update Contact
//     const updateContact = contact => {
//         dispatch({ type: UPDATE_CONTACT, payload: contact })
//     }
//     //Filter Contact
//     const filterContacts = text => {
//         dispatch({ type: FILTER_CONTACTS, payload: text })
//     }
//     //Clear Filter
//     const clearFilter= () => {
//         dispatch({ type: CLEAR_FILTER})
//     }

//     return (
//         //*** */anything we want to access from other components (state, action)
//         //we can see all these state in React tool on Chrome
//         <ContactContext.Provider
//         value={{
//             contacts: state.contacts,
//             current: state.current,
//             filtered: state.filtered,
//             addContact,
//             deleteContact,
//             setCurrent,
//             clearCurrent,
//             updateContact,
//             filterContacts,
//             clearFilter
//         }}>
//             {props.children}
//         </ContactContext.Provider>
//     );
// };

// export default ContactState; //import and wrap everything in App.js


//=================================================================================
//                  Hard coded contacts test 
//=================================================================================

// import React, { useReducer } from 'react';
// import uuid from 'uuid';
// import ContactContext from './contactContext';
// import contactReducer from './contactReducer';
// import {
//     ADD_CONTACT,
//     DELETE_CONTACT,
//     SET_CONTACT,
//     CLEAR_CONTACT,
//     UPDATE_CONTACT,
//     FILTER_CONTACT,
//     CLEAR_FILTER
// } from '../types';

// const ContactState = props => {
//     const initialState = {
//         contacts:[
//             {
//                 id: 1,
//                 name: 'Jill Johnson',
//                 email: 'Jill@gmail.com',
//                 phone: '111-111-1111',
//                 type: 'personal'
//             },
//             {
//                 id: 2,
//                 name: 'Sara Watson',
//                 email: 'sara@gmail.com',
//                 phone: '222-222-2222',
//                 type: 'personal'
//             },
//             {
//                 id: 3,
//                 name: 'Harry White',
//                 email: 'harry@gmail.com',
//                 phone: '333-333-3333',
//                 type: 'professional'
//             },    
//         ]
//     };
//     //Dispatch from Reducer with Reducer Hook
//     const [state, dispatch] = useReducer(contactReducer, initialState);

//     //Add Contact

//     //Delete Contact

//     //Set Current Contact

//     //Clear Current Contact

//     //Update Contact

//     //Filter Contact

//     //Clear Filter

//     return (
//         <ContactContext.Provider
//         //anything we want to access from other components (state, action)
//         value={{
//             contacts: state.contacts
//         }}>
//             { props.children }
//         </ContactContext.Provider>
//     );
// };

// export default ContactState; //import and wrap everything in App.js