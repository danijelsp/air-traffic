// import node modules
import React, { Component } from 'react';
import { Provider } from 'react-redux';

// import components
import Container from "./components/Container";

// import css
import 'normalize.css/normalize.css';
import './App.css';

// import store
import configureStore from "./store/configureStore";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

export default App;
