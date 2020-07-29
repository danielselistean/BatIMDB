import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyImdb from '../src/Containers/MyImdb';
import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MyImdb />
        </div>
      </BrowserRouter>
    );
  }
}

export default App


