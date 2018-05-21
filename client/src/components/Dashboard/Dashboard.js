import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router"

class Dashboard extends Component {
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
<h2> Hangout Dashboard </h2>
);
}
}

export default Dashboard;