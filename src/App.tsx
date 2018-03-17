import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './app/common/store/store';
import { Recipes } from './app/recipes/';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
            <BrowserRouter>
                <div className="center-grid">
                  <Recipes />
                </div>
            </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
