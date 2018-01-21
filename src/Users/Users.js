import React, {Component} from 'react';
import UserOutput from './UserOutput/UserOutput';
import UserInput from './UserInput/UserInput';
import IfElse from '../Shared/Layout/IfElse/IfElse';

class Users extends Component {

    state = {
        name: '',
        isVisible: false
    };

    setName = (name) =>{
        this.setState({
            name
        });
    };

    toggle = () =>{
        const isVisible = !this.state.isVisible;
        this.setState({
            isVisible
        });
    };

    render(){
        console.log(console.log(this.props) );
        const showElse = (
            <h1>no users</h1>
        );

        return (
            <div>
                <h1>Users</h1>
                <button onClick={this.toggle}>Toggle</button>
                <IfElse if={this.state.isVisible}>
                    <UserInput name={this.state.name} onNameChange={this.setName}/>
                    <UserOutput name={this.state.name}/>
                    <UserOutput name={this.state.name}/>
                </IfElse>
            </div>
        );
    }
}

export default Users;