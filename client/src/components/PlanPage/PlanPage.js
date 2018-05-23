import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router";
import NavBar from "../NavBar/NavBar";

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
          hangoutInfo: res.data
        });
      })
      .catch(err => {
        this.setState({
          message: `${err.response}`
        });
      });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="planPageContainer">
        <NavBar />
      </div>
    );
  }
}

export default PlanPage;
