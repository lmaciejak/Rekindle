import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router";
import NavBar from "../NavBar/NavBar";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      fetchingUser: true,
      dashboardInfo: ""
    };
  }

  componentDidMount = () => {
    axios
      .get(`/users/getdashboardhangouts`)
      .then(res => {
        console.log("RES!!!!!", res);
        let tracker = {};
        let newArr = [];
        let arr = res.data
        arr.forEach(elem => {
          console.log("elem", elem["usertosharewith_id"]);
          if (!tracker[elem["usertosharewith_id"]]) {
            tracker[elem["usertosharewith_id"]] = 1;
            newArr.unshift(elem);
          }
        });
        this.setState({
          dashboardInfo: newArr
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
    console.log("dashboard", this.state.dashboardInfo);
    return (
      <div className="hangoutPage">
        <NavBar />
        <div className="hangoutDashboardContainer">
          <div className="hangoutDashboardContent">
            <h2 className="dashboardTitle"> Hangout Dashboard </h2>
            {this.state.dashboardInfo ? this.state.dashboardInfo.map((elem) => ( 
              <div> {elem.full_name} 
              <br /> 
              <img src={elem.user_img} />
              <br /> 
              {elem.availability_starttime}
              </div> 
            )) : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
