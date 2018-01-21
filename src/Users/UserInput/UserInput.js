import React from 'react';

const UserInput = (props) => {
    return (
        <div>
            <input type="text" value={props.name} onChange={(e) => props.onNameChange(e.target.value)}/>
        </div>
    )
};

export default UserInput;