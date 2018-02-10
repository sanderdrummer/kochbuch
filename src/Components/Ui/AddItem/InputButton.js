import React from 'react';
import PropTypes from 'prop-types';

const InputButton = (props) => (
    <form onSubmit={(e) => {e.preventDefault();props.triggerOnClick()}} className="field has-addons">
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
            <button onClick={props.triggerOnClick} type="button" className={
                props.isLoading ? 'button is-primary is-loading': 'button is-primary'
            }>
                {props.buttonLabel}
            </button>
        </div>
    </form>
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