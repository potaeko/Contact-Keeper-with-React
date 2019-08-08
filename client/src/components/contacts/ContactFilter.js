//racf
import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef(''); //nothing by default

    //destructor, we don't have to repeat typing contactContext.
    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
        if( filtered === null ){
            text.current.value = '';
        }
    });

    const onChange = e => {
        if(text.current.value !== ''){
            //filterContacts()
            // contactContext.filterContacts(e.target.value);
            filterContacts(e.target.value);
        } else {
            clearFilter();
            //clearFilter()
            // contactContext.clearFilter();
            
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange=
            {onChange}/>
        </form>
    )
}

export default ContactFilter
