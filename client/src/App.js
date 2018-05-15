import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LandingPage from "./components/LandingPage/LandingPage";
import Homepage from "./components/Homepage/Homepage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/rekindle" component={Homepage} />
        </Switch>
      </div>
    );
  }
}

export default App;
