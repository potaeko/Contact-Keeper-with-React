//rafc
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

//Common pattern for creating private route
const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;

    return (
        <Route { ...rest } 
            //if not authenticated and finished loading then redirect to login page
            render={props => 
                !isAuthenticated && !loading ? (
                    <Redirect to='/login' />
                ) : (
                  < Component {...props} />
                )
            } 
        />
    );
};

export default PrivateRoute
