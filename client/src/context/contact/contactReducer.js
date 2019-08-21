//==============================================================
//              BackEnd Get contact
//              loading: false, when finished loading
//==============================================================

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

export default (state, action) => {
    switch(action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };
        case UPDATE_CONTACT:
            return{
                ...state,
                contacts: state.contacts.map(contact => 
                    //use ._id for mongodb
                    contact._id === action.payload._id ? action.payload : contact
                ),
                loading: false
            };    
        //filter out by id   
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact._id !== action.payload),
                    loading: false
            };
        //clear everthing
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    //regex: regular expression
                    //gi: global and insensitive
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                })             
            };    
        case CLEAR_FILTER:
                return {
                    ...state,
                filtered: null
                };
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            };    
        default:
            return state;
    }
}
//=====================================================================
//                          Hard Coded contact list
//=====================================================================
// import {
//     ADD_CONTACT,
//     DELETE_CONTACT,
//     SET_CURRENT,
//     CLEAR_CURRENT,
//     UPDATE_CONTACT,
//     FILTER_CONTACTS,
//     CLEAR_FILTER,
//     CONTACT_ERROR
// } from '../types';

// export default (state, action) => {
//     switch(action.type) {
//         case ADD_CONTACT:
//             return {
//                 ...state,
//                 contacts: [...state.contacts, action.payload]
//             };
//         case UPDATE_CONTACT:
//             return{
//                 ...state,
//                 contacts: state.contacts.map(contact => 
//                     contact.id === action.payload.id ? action.payload : contact
//                 )
//             };    
//         //filter out by id   
//         case DELETE_CONTACT:
//             return {
//                 ...state,
//                 contacts: state.contacts.filter(
//                     contact => contact.id !== action.payload)
//             };
//         case SET_CURRENT:
//             return {
//                 ...state,
//                 current: action.payload
//             };
//         case CLEAR_CURRENT:
//             return {
//                 ...state,
//                 current: null
//             };
//         case FILTER_CONTACTS:
//             return {
//                 ...state,
//                 filtered: state.contacts.filter(contact => {
//                     //regex: regular expression
//                     //gi: global and insensitive
//                     const regex = new RegExp(`${action.payload}`, 'gi');
//                     return contact.name.match(regex) || contact.email.match(regex);
//                 })             
//             };    
//         case CLEAR_FILTER:
//                 return {
//                     ...state,
//                 filtered: null
//                 };
//         case CONTACT_ERROR:
//             return {
//                 ...state,
//                 error: action.payload
//             };    
//         default:
//             return state;
//     }
// }