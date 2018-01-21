import React from 'react';
import PropTypes from 'prop-types';

const Notification = (props) =>{

    let typeClass = 'message ' + (props.type || '');

    return props.message ? (<article className={typeClass}>
        <div className="message-body">
            {props.message}
        </div>
    </article>) : null;
};


Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string
};

export default Notification;