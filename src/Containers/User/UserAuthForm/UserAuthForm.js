import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../../../Store/User/userActions'
import IfElse from '../../../Shared/Layout/IfElse/IfElse';

class UserAuthForm extends Component {

    state = {
        email: '',
        password: '',
    };

    componentDidMount() {
        this.props.checkAuth()
    }
    
    componentDidUpdate() {
        console.log(this.props);
    }
    
    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);
        this.props.doAuth(this.state);
    };

    updateEmail = (e) =>{
        const email = e.target.value;
        this.setState(state => {
            return {
                ...state,
                email
            }
        })
    };

    updatePassword = (e) =>{
        const password = e.target.value;
        this.setState(state => {
            return {
                ...state,
                password
            }
        })
    };

    render(){

        const logout = (
            <button onClick={this.props.logOut} className="button is-primary">Abmelden</button>
        );

        return (
            <IfElse if={!(this.props.user && this.props.user.idToken)} else={logout}>
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="label">E-Mail</label>
                        <div className="control">
                            <input
                                autoFocus="true"
                                required
                                onChange={this.updateEmail}
                                value={this.state.email}
                                className="input" type="email" placeholder="E-Mail"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Passwort</label>
                        <div className="control">
                            <input
                                required
                                onChange={this.updatePassword}
                                value={this.state.password}
                                className="input" type="password" placeholder="Passwort"/>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">Anmelden</button>
                        </div>
                    </div>
                </form>
            </IfElse>

        )
    }
}

const mapStateToProps = state =>{
    return {
        user: state.user.user
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        doAuth: (info) => dispatch(userActions.doAuth(info)),
        checkAuth: () => dispatch(userActions.checkAuth()),
        logOut: () => dispatch(userActions.logOut()),
    }
};

UserAuthForm.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserAuthForm);