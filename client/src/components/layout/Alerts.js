import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
    //initialize
    const alertContext = useContext(AlertContext);

    return (
        //if alert length greater than zero then map with id
        alertContext.alerts.length > 0 && 
        alertContext.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className='fas fa-info-circle' /> {alert.msg}
            </div>
        ))
    );
};

export default Alerts
