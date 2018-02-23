import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './app/common/store/store';
import Recipes from './app/recipes/recipes';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
            <BrowserRouter>
                <Recipes />
            </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
