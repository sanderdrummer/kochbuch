import React from 'react';
import PropTypes from 'prop-types';

const AddItem = (props) => (
    <div className="field has-addons">
        <div className="control grow">
            <input className="input"
                   required
                   autoFocus="true"
                   onChange={props.updateValue}
                   value={props.value}
                   type="text"
                   placeholder={props.placeholder} />
        </div>
        <div className="control">
            <a onClick={props.triggerOnClick} className="button is-info">
                {props.buttonLabel}
            </a>
        </div>
    </div>
);

AddItem.propTypes = {
    buttonLabel: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    updateValue: PropTypes.func,
    triggerOnClick: PropTypes.func
};

export default AddItem;