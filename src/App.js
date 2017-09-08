import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './js/fixed/HeaderComponent';
import Footer from './js/fixed/Footer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './js/reducers';
import DrawingBoard from './js/pages/DrawingBoardComponent.js';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header/>

          <DrawingBoard />

          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
