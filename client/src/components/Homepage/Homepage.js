import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Homepage.css";
import Calendar from "../Calendar/Calendar";
import NavBar from "../NavBar/NavBar";

class Homepage extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('this.props.user', this.props.user)
    return (
      <div className="homepageContainer">
        <NavBar user={this.props.user} />
        <div className="calendarBig">
        <Calendar />
        </div>
      </div>
    );
  }
}

export default Homepage;

// <h1> Rekindle makes it easier to schedule hangouts. </h1>
// <h1 className="homeName"> Rekindle </h1>
