
//==============================================================
//                      Bring Authentication
//==============================================================
import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        //loadUser use the token and validate isAuthenticated: true
        authContext.loadUser();
        //eslint-disable-next-line
    },[]);

    return (
        <div className="grid-2">
            <div>
                {/*ContactForm, work on ContactForm.js*/}
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>    
        </div>
    )
}

export default Home

//==============================================================
//                          Step 1
//==============================================================
// import React from 'react'
// import Contacts from '../contacts/Contacts';
// import ContactForm from '../contacts/ContactForm';
// import ContactFilter from '../contacts/ContactFilter';

// const Home = () => {
//     return (
//         <div className="grid-2">
//             <div>
//                 {/*ContactForm, work on ContactForm.js*/}
//                 <ContactForm />
//             </div>
//             <div>
//                 <ContactFilter />
//                 <Contacts />
//             </div>    
//         </div>
//     )
// }

// export default Home
