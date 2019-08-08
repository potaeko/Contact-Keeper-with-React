//racf
import React, { useContext } from 'react';
//impt
import PropTypes from 'prop-types';
//bring in delete function
import ContactContext from '../../context/contact/contactContext';




//pass in contact as a prop
const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    //deconstructuring 
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    //deconstructing from contact prop
    const { id, name, email, phone, type } = contact;
    //function for delete button
    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    }

    return (
        <div className='card bg-light'>
            {/* h3.text-primary.text-left */}
            <h3 className="text-primary text-left">
                {/* if professional then use badge-success, other use badge-primary */}
                {name}{' '} 
                <span style={{ float: 'right'}}
                    className={
                        'badge ' +  (type === 'professional' ? 'badge-success' : 'badge-primary')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && (<li>
                    <i className="fas fa-envelope-open"></i> {email}
                </li>)}
                {phone && (<li>
                    <i className="fas fa-phone-open"></i> {phone}
                </li>)}
            </ul>
            <p>
                {/* button.btn.btn-dark.btn-sm */}
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
            </p>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired //ptor
}

export default ContactItem

//=================================================================================
//               Before bring contact funciton from ContactState.js
//=================================================================================

// //racf
// import React from 'react';
// //impt
// import PropTypes from 'prop-types';

// //pass in contact as a prop
// const ContactItem = ({ contact }) => {

//     //deconstructing from contact prop
//     const { id, name, email, phone, type } = contact;
//     return (
//         <div className='card bg-light'>
//             {/* h3.text-primary.text-left */}
//             <h3 className="text-primary text-left">
//                 {/* if professional then use badge-success, other use badge-primary */}
//                 {name}{' '} 
//                 <span style={{ float: 'right'}}
//                     className={
//                         'badge ' +  (type === 'professional' ? 'badge-success' : 'badge-primary')
//                     }
//                 >
//                     {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </span>
//             </h3>
//             <ul className="list">
//                 {email && (<li>
//                     <i className="fas fa-envelope-open"></i> {email}
//                 </li>)}
//                 {phone && (<li>
//                     <i className="fas fa-phone-open"></i> {phone}
//                 </li>)}
//             </ul>
//             <p>
//                 {/* button.btn.btn-dark.btn-sm */}
//                 <button className="btn btn-dark btn-sm">Edit</button>
//                 <button className="btn btn-danger btn-sm">Delete</button>
//             </p>
//         </div>
//     );
// };

// ContactItem.propTypes = {
//     contact: PropTypes.object.isRequired //ptor
// }

// export default ContactItem
