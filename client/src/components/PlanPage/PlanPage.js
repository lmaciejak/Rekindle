import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router";
import NavBar from "../NavBar/NavBar";
import "./PlanPage.css";

class PlanPage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      fetchingUser: true,
      hangoutInfo: []
    };
  }

  componentDidMount = () => {
    axios
      .get(`/users/gethangoutinfo/2`)
      .then(res => {
        this.setState({
          hangoutInfo: res.data[0]
        });
      })
      .catch(err => {
        this.setState({
          message: `${err.response}`
        });
      });
  };

  render() {
    console.log("hangoutinfo", this.state.hangoutInfo);
    console.log(
      "date",
      new Date(this.state.hangoutInfo.availability_starttime)
    );
    const dateStart = new Date(this.state.hangoutInfo.availability_starttime);
    const { user } = this.state;
    return (
      <div className="planPageContainer">
        <NavBar />
        <div className="planPageContent">
          <h1> {dateStart.toString()} </h1>
          <h1> hello </h1>
        </div>
      </div>
    );
  }
}

export default PlanPage;