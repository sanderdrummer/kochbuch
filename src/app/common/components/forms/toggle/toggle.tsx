import * as React from 'react';
import { Switch } from './switch';

export class Toggle extends React.Component<{}, {on: boolean}> {

    state = {on: false};

    toggle = () => this.setState(({on}) => ({on: !on}));

    render() {
        return (
            <Switch on={this.state.on} onClick={this.toggle} />
        );
    }
}