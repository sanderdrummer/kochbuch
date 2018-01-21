import React from 'react';
import PropTypes from 'prop-types';

const InputButton = (props) => (
    <div className="field has-addons">
        <div className="control grow">
            <input className="input"
                   required
                   autoFocus="true"
                   onChange={props.updateValue}
                   value={props.value}
                   type={props.inputType || 'text'}
                   placeholder={props.placeholder} />
        </div>
        <div className="control">
            <a onClick={props.triggerOnClick} className={
                props.isLoading ? 'button is-primary is-loading': 'button is-primary'
            }>
                {props.buttonLabel}
            </a>
        </div>
    </div>
);

InputButton.propTypes = {
    inputType: PropTypes.string,
    buttonLabel: PropTypes.string,
    placeholder: PropTypes.string,
    updateValue: PropTypes.func,
    triggerOnClick: PropTypes.func,
    isLoading: PropTypes.bool
};

export default InputButton;