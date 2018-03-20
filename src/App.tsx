import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './app/common/store/store';
import './app.css';
import Layout from './app/layout';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
            <BrowserRouter>
                <div className="center-grid">
                  <Layout />
                </div>
            </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
