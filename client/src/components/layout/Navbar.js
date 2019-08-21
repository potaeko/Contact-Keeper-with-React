import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types';//impt
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

//bring props: title and icon
const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContexts = useContext(ContactContext);

    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContexts;

    const onLogout = () => {
        logout();
        clearContacts();
    };

    const authLinks = (
        <Fragment>
            {/* check if there is a user then user.name */}
            <li>Hello { user && user.name }</li>
             <li>
                 <a onClick={onLogout} href="#!">
                     {/* log out icon, hide text on small screen */}
                     <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                 </a>
             </li>
        </Fragment>
    );

    const guessLinks = (
        <Fragment>
            <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}/> {title}
            </h1>
            <ul>
                {/* if authenticated then authLinks if not guessLinks */}
                {isAuthenticated ? authLinks : guessLinks}
            </ul>
        </div>
    )
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar
