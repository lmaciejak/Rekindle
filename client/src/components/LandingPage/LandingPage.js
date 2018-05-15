import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./LandingPage.css";
import DemoLogin from "../Login/DemoLogin";

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      fetchingUser: true
    };
  }

  render() {
    const { user } = this.state;
    return (
      <div className="landingContainer">
        <img
          className="landingImage"
          src="https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"
        />
        <h1 className="landingName"> Rekindle </h1>
        <h4 className="landingTagLine">
          {" "}
          Scheduling plans with friends, made easy{" "}
        </h4>
        <div className="buttonContainer">
          <Login className="landingButton loginButton" />
          <Register className="landingButton registerButton" />
          <DemoLogin />
        </div>
      </div>
    );
  }
}

export default LandingPage;
