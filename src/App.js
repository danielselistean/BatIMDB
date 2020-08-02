import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import MyImdb from '../src/Containers/MyImdb';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <MyImdb />
        </div>
      </Router>
    );
  }
}

export default App


