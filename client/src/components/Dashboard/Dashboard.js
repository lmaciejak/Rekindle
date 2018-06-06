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
        let arr = res.data;
        arr.forEach(elem => {
          console.log("elem", elem["usertosharewith_id"]);
          if (!tracker[elem["availability_user_id"]]) {
            tracker[elem["availability_user_id"]] = 1;
            let date1 = new Date(elem.availability_starttime);
            var date2 = new Date();
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            elem["timeDif"] = diffDays;
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
        <NavBar user={this.props.user} />
        <div className="hangoutDashboardContainer">
          <div className="hangoutDashboardContent">
            <h1 className="dashboardTitle"> Hangout Dashboard </h1>
            {this.state.dashboardInfo
              ? this.state.dashboardInfo.map(elem => (
                  <div className='dashboardUserInfo'>
                    {" "}
                    {elem.timeDif > 1 ? (
                      <span className="timeDiff">
                        {elem.timeDif} days have passed
                      </span>
                    ) : (
                      <span className="timeDiff">1 day has passed</span>
                    )}{" "}
                    <br />
                    since you last saw {elem.full_name}
                    <br />
                    <br />
                    <img src={elem.user_img} className="dashboardImage" />
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

// Last hangout date {new Date(elem.availability_starttime).toString().slice(0, 15)}
