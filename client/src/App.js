import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
      </div>
    );
  }
}

export default App;
