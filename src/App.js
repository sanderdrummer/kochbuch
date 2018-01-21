import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import {Provider as Provider} from 'react-redux';
import store from './Store/store';
import './App.css';

class App extends Component {
    render(){
        return (
            <Provider store={store}>
                <div className="App">
                    <BrowserRouter>
                        <Layout/>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default App;