import React from 'react';

const UserOutput = (props) => {
    return (
        <div>
            <p>Your selected UserName</p>
            <p>{props.name}</p>
        </div>
    );
};

export default UserOutput;