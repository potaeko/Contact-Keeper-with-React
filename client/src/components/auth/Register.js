
//=================================================================================
//                                  Bring Authentication for global token
//=================================================================================
import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

//passing props for props.history
const Register = props => {
    //initialize
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;
    //checking token for authentication
    useEffect(() => {
        //redirect to home page
        if(isAuthenticated) {
           props.history.push('/')
        } 

        if(error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();

        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]); //dependencies

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '' //pasword confirmation
    });

    const { name, email, password, password2 } = user;
    //Spread operator to get current data
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        //case1: form not filled
        if(name === '' || email === '' || password === '' ){
            setAlert('Please enter all fields', 'danger');
        } 
        //case2: password not matched
        else if (password !== password2) {
            setAlert('Passwords do not match', 'danger')
        }
        //case3: success
        else {
            //form data
            register({
                name,
                email,
                password
            });
        }
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type='text' 
                        name='name' 
                        value={name} 
                        onChange={onChange} 
                        required 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='email' 
                        name='email' 
                        value={email} 
                        onChange={onChange} 
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        value={password} 
                        onChange={onChange} 
                        required
                        minLength="6"
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input 
                        type='password' 
                        name='password2' 
                        value={password2} 
                        onChange={onChange} 
                        required
                        minLength="6"
                    />
                </div>
                <input type='submit' value='Register' className='btn btn-primary btn-block'/>
            </form>
        </div>
    );
};

export default Register;
//=================================================================================
//                                  Bring in Auth for register
//=================================================================================
// import React, { useState, useContext, useEffect } from 'react';
// import AlertContext from '../../context/alert/alertContext';
// import AuthContext from '../../context/auth/authContext';

// const Register = () => {
    
//     const alertContext = useContext(AlertContext);
//     //initialize
//     const authContext = useContext(AuthContext);

//     const { setAlert } = alertContext;
//     const { register, error, clearErrors } = authContext;
//     //error UI
//     useEffect(() => {
//         if(error === 'User already exists') {
//             setAlert(error, 'danger');
//             clearErrors();

//         }
//     }, [error]); //dependency

//     const [user, setUser] = useState({
//         name: '',
//         email: '',
//         password: '',
//         password2: '' //pasword confirmation
//     });

//     const { name, email, password, password2 } = user;
//     //Spread operator to get current data
//     const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

//     const onSubmit = e => {
//         e.preventDefault();

//         //case1: form not filled
//         if(name === '' || email === '' || password === '' ){
//             setAlert('Please enter all fields', 'danger');
//         } 
//         //case2: password not matched
//         else if (password !== password2) {
//             setAlert('Passwords do not match', 'danger')
//         }
//         //case3: success
//         else {
//             //form data
//             register({
//                 name,
//                 email,
//                 password
//             });
//         }
//     };

//     return (
//         <div className='form-container'>
//             <h1>
//                 Account <span className="text-primary">Register</span>
//             </h1>
//             <form onSubmit={onSubmit}>
//                 <div className='form-group'>
//                     <label htmlFor='name'>Name</label>
//                     <input 
//                         type='text' 
//                         name='name' 
//                         value={name} 
//                         onChange={onChange} 
//                         required 
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='email'>Email</label>
//                     <input 
//                         type='email' 
//                         name='email' 
//                         value={email} 
//                         onChange={onChange} 
//                         required
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='password'>Password</label>
//                     <input 
//                         type='password' 
//                         name='password' 
//                         value={password} 
//                         onChange={onChange} 
//                         required
//                         minLength="6"
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='password2'>Confirm Password</label>
//                     <input 
//                         type='password' 
//                         name='password2' 
//                         value={password2} 
//                         onChange={onChange} 
//                         required
//                         minLength="6"
//                     />
//                 </div>
//                 <input type='submit' value='Register' className='btn btn-primary btn-block'/>
//             </form>
//         </div>
//     );
// };

// export default Register;
// //=================================================================================
// //                                  Bring in AlertContext
// //=================================================================================
// import React, { useState, useContext } from 'react';
// import AlertContext from '../../context/alert/alertContext';

// const Register = () => {
//     //initialize
//     const alertContext = useContext(AlertContext);

//     const { setAlert } =alertContext;

//     const [user, setUser] = useState({
//         name: '',
//         email: '',
//         password: '',
//         password2: '' //pasword confirmation
//     });

//     const { name, email, password, password2 } = user;
//     //Spread operator to get current data
//     const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

//     const onSubmit = e => {
//         e.preventDefault();

//         //case1: form not filled
//         if(name === '' || email === '' || password === '' ){
//             setAlert('Please enter all fields', 'danger');
//         } 
//         //case2: password not matched
//         else if (password !== password2) {
//             setAlert('Passwords do not match', 'danger')
//         }
//         //case3: success
//         else {
//             console.log('Register submit');
//         }
//     };

//     return (
//         <div className='form-container'>
//             <h1>
//                 Account <span className="text-primary">Register</span>
//             </h1>
//             <form onSubmit={onSubmit}>
//                 <div className='form-group'>
//                     <label htmlFor='name'>Name</label>
//                     <input 
//                         type='text' 
//                         name='name' 
//                         value={name} 
//                         onChange={onChange} 
//                         required 
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='email'>Email</label>
//                     <input 
//                         type='email' 
//                         name='email' 
//                         value={email} 
//                         onChange={onChange} 
//                         required
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='password'>Password</label>
//                     <input 
//                         type='password' 
//                         name='password' 
//                         value={password} 
//                         onChange={onChange} 
//                         required
//                         minLength="6"
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='password2'>Confirm Password</label>
//                     <input 
//                         type='password' 
//                         name='password2' 
//                         value={password2} 
//                         onChange={onChange} 
//                         required
//                         minLength="6"
//                     />
//                 </div>
//                 <input type='submit' value='Register' className='btn btn-primary btn-block'/>
//             </form>
//         </div>
//     );
// };

// export default Register;
//=================================================================================
//                                  Create form, onChange and onSubmit
//=================================================================================
// import React, { useState } from 'react';

// const Register = () => {
//     const [user, setUser] = useState({
//         name: '',
//         email: '',
//         password: '',
//         password2: '' //pasword confirmation
//     });

//     const { name, email, password, password2 } = user;
//     //Spread operator to get current data
//     const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

//     const onSubmit = e => {
//         e.preventDefault();
//         console.log('Register submit')
//     };

//     return (
//         <div className='form-container'>
//             <h1>
//                 Account <span className="text-primary">Register</span>
//             </h1>
//             <form onSubmit={onSubmit}>
//                 <div className='form-group'>
//                     <label htmlFor='name'>Name</label>
//                     <input type='text' name='name' value={name} onChange={onChange} />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='email'>Email</label>
//                     <input type='email' name='email' value={email} onChange={onChange} />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='password'>Password</label>
//                     <input type='password' name='password' value={password} onChange={onChange} />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='password2'>Confirm Password</label>
//                     <input type='password' name='password2' value={password2} onChange={onChange} />
//                 </div>
//                 <input type='submit' value='Register' className='btn btn-primary btn-block'/>
//             </form>
//         </div>
//     );
// };

// export default Register;
