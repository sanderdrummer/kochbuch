import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './components/common/store/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
            <BrowserRouter>
                <div>hello world</div>
            </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
