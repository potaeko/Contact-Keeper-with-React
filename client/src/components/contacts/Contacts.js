//=======================================================================
//              Step #6  GetContact for backend & Show spinner
//=======================================================================
import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading } = contactContext; //pull out from contactState.js

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, []);

    if(contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add a contact</h4>;
    }

    return (
        <Fragment>
            {/* //if contacts is not null and not loading then spinner */}
            {contacts !== null && !loading ? (
            <TransitionGroup>
                {filtered !== null 
                ? filtered.map(contact => (
                    //change contact.id (hard coded with uuid) to contact._id for Mongodb
                    <CSSTransition 
                        key={contact._id}  
                        timeout={500} 
                        classNames="item"
                        >
                            <ContactItem  contact={contact} />
                    </CSSTransition>
                ))
                : contacts.map(contact => (
                    <CSSTransition 
                        key={contact._id} 
                        timeout={500} 
                        classNames="item"
                        >
                            <ContactItem contact={contact} />
                    </CSSTransition>
                ))}
            </TransitionGroup>) : <Spinner />}
        </Fragment>
    );
};

export default Contacts
//=======================================================================
//              Step #5  Connect with Mongodb, addContact
//=======================================================================
// import React, { Fragment, useContext } from 'react';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import ContactItem from './ContactItem';
// import ContactContext from '../../context/contact/contactContext';

// const Contacts = () => {
//     const contactContext = useContext(ContactContext);

//     const { contacts, filtered } = contactContext; //pull out from contactState.js

//     if(contacts.length === 0) {
//         return <h4>Please add a contact</h4>;
//     }

//     return (
//         <Fragment>
//             <TransitionGroup>
//             {filtered !== null 
//                 ? filtered.map(contact => (
//                     //change contact.id (hard coded with uuid) to contact._id for Mongodb
//                     <CSSTransition key={contact._id} timeout={500} classNames="item">
//                         <ContactItem  contact={contact} />
//                     </CSSTransition>
//                 ))
//                 : contacts.map(contact => (
//                     <CSSTransition key={contact._id} timeout={500} classNames="item">
//                         <ContactItem contact={contact} />
//                     </CSSTransition>
//                 ))}
//             </TransitionGroup>
//         </Fragment>
//     );
// };

// export default Contacts
//=======================================================================
//              Step #4  UI fade transition, react-transition-group
//=======================================================================
// import React, { Fragment, useContext } from 'react';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import ContactItem from './ContactItem';
// import ContactContext from '../../context/contact/contactContext';

// const Contacts = () => {
//     const contactContext = useContext(ContactContext);

//     const { contacts, filtered } = contactContext; //pull out from contactState.js

//     if(contacts.length === 0) {
//         return <h4>Please add a contact</h4>;
//     }

//     return (
//         <Fragment>
//             <TransitionGroup>
//             {filtered !== null 
//                 ? filtered.map(contact => (
//                     <CSSTransition key={contact.id} timeout={500} classNames="item">
//                         <ContactItem  contact={contact} />
//                     </CSSTransition>
//                 ))
//                 : contacts.map(contact => (
//                     <CSSTransition key={contact.id} timeout={500} classNames="item">
//                         <ContactItem contact={contact} />
//                     </CSSTransition>
//                 ))}
//             </TransitionGroup>
//         </Fragment>
//     );
// };

// export default Contacts
//=======================================================================
//              Step #3  working with filter for UI
//=======================================================================
// import React, { Fragment, useContext } from 'react';
// import ContactItem from './ContactItem';
// import ContactContext from '../../context/contact/contactContext';

// const Contacts = () => {
//     const contactContext = useContext(ContactContext);

//     const { contacts, filtered } = contactContext; //pull out from contactState.js

//     if(contacts.length === 0) {
//         return <h4>Please add a contact</h4>;
//     }

//     return (
//         <Fragment>
//             {filtered !== null 
//                 ? filtered.map(contact => (
//                     <ContactItem key={contact.id} contact={contact} />
//                 ))
//                 : contacts.map(contact => (
//                     <ContactItem key={contact.id} contact={contact} />
//                 ))}
//         </Fragment>
//     );
// };

// export default Contacts
//=======================================================================
//              Step #2 before working with filter
//=======================================================================
// import React, { Fragment, useContext } from 'react';
// import ContactItem from './ContactItem';
// import ContactContext from '../../context/contact/contactContext';

// const Contacts = () => {
//     const contactContext = useContext(ContactContext);

//     const { contacts } = contactContext; //pull out from contactState.js

//     return (
//         <Fragment>
//             {contacts.map(contact => (
//                 <ContactItem key={contact.id} contact={contact}/>
//             ))}
//         </Fragment>
//     )
// }

// export default Contacts

//============================================================================
//              Step #1 trying contact.name before create ContactItem.js
//============================================================================

//racf
// import React, { Fragment, useContext } from 'react';
// import ContactContext from '../../context/contact/contactContext';

// const Contacts = () => {
//     const contactContext = useContext(ContactContext);

//     const { contacts } = contactContext; //pull out from contactState.js

//     return (
//         <Fragment>
//             {contacts.map(contact => (
//                 <h3>{contact.name}</h3>
//             ))}
//         </Fragment>
//     )
// }

// export default Contacts
