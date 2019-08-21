



//====================================================
//              Add & Edit & delete Contact Form
//====================================================

//rafc
import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    //destructor
    const { addContact, updateContact, clearCurrent, current } = contactContext;

    useEffect(() => {
        if (current !== null){
            setContact(current);
        }   else {
            setContact({
                name: '',
                email:'',
                phone:'',
                type:'person'
            });
        }
    }, [contactContext, current]);//dependencies if change

    //initial state
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    //form value
    const { name, email, phone, type } = contact;

    //change the value
    const onChange = e => 
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        //clearAll
        if(current === null) {
            //show contact in UI
            addContact(contact)
        } else {
            updateContact(contact);
        }

        //set to default
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
    };

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">
                {current ? 'Edit Contact' : 'Add Contact'}    
            </h2>
            <input 
                type="text" 
                placeholder="Name" 
                name="name" 
                value={name} 
                onChange={onChange}
            />
             <input 
                type="email" 
                placeholder="Email" 
                name="email" 
                value={email} 
                onChange={onChange}
            />
             <input 
                type="text" 
                placeholder="Phone" 
                name="phone" 
                value={phone} 
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input 
                type="radio" 
                name="type" 
                value="personal" 
                checked={type === 'personal'}
                onChange={onChange}
            />{' '} 
            Personal{' '}
            <input 
                type="radio" 
                name="type" 
                value="professional" 
                checked={type === 'professional'}
                onChange={onChange}
            />{' '} 
            Professional
            <div>
                <input 
                    type="submit" 
                    value={current ? 'Update Contact' : 'Add Contact'}   
                    className='btn btn-primary btn-block'
                />
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>}
        </form>
    )
}

export default ContactForm;





//====================================================
//               Add Contact Form
//====================================================

//rafc
// import React, { useState, useContext, useEffect } from 'react';
// import ContactContext from '../../context/contact/contactContext';
// import { SET_CURRENT } from '../../context/types';

// const ContactForm = () => {
//     const contactContext = useContext(ContactContext);

//     //initial state
//     const [contact, setContact] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         type: 'personal'
//     });

//     //form value
//     const { name, email, phone, type } = contact;

//     //change the value
//     const onChange = e => 
//         setContact({ ...contact, [e.target.name]: e.target.value });

//     const onSubmit = e => {
//         e.preventDefault();
//         //addContact action
//         contactContext.addContact(contact);
//         //set to default
//         setContact({
//             name: '',
//             email: '',
//             phone: '',
//             type: 'personal'
//         });
//     };

//     return (
//         <form onSubmit={onSubmit}>
//             <h2 className="text-primary">Add Contact</h2>
//             <input 
//                 type="text" 
//                 placeholder="Name" 
//                 name="name" 
//                 value={name} 
//                 onChange={onChange}
//             />
//              <input 
//                 type="email" 
//                 placeholder="Email" 
//                 name="email" 
//                 value={email} 
//                 onChange={onChange}
//             />
//              <input 
//                 type="text" 
//                 placeholder="Phone" 
//                 name="phone" 
//                 value={phone} 
//                 onChange={onChange}
//             />
//             <h5>Contact Type</h5>
//             <input 
//                 type="radio" 
//                 name="type" 
//                 value="personal" 
//                 checked={type === 'personal'}
//                 onChange={onChange}
//             />{' '} 
//             Personal{' '}
//             <input 
//                 type="radio" 
//                 name="type" 
//                 value="professional" 
//                 checked={type === 'professional'}
//                 onChange={onChange}
//             />{' '} 
//             Professional
//             <div>
//                 <input 
//                     type="submit" 
//                     value="Add Contact" 
//                     className='btn btn-primary btn-block'
//                 />
//             </div>
//         </form>
//     )
// }

// export default ContactForm;
