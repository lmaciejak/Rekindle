import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router";
import NavBar from "../NavBar/NavBar";


class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      fetchingUser: true,
      hangoutInfo: []
    };
  }

  render() {
    const { user } = this.state;
    return (
      <div className="planPageContainer">
        <NavBar />
        <div className="planPageContent">
          <h1> User Profile Page </h1>
        </div>
      </div>
    );
  }
}

export default Profile;
