import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router"
import NavBar from "../NavBar/NavBar";
import './Dashboard.css'

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
      <div>
      <NavBar />
<h2 className='dashboardTitle'> Hangout Dashboard </h2>
</div>
);
}
}

export default Dashboard;