import React, { Component } from "react";
import axios from 'axios'
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LandingPage from "./components/LandingPage/LandingPage";
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import PlanPage from "./components/PlanPage/PlanPage";
import Profile from "./components/Profile/Profile";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      fetchingUser: true,
    }
  }

  loggedInUser = () => {
    axios.get('/users')
    .then(response =>{
      if(response.data){
        this.setState({
          user: response.data[0],
          fetchingUser: false
        })
      }
    })
    .catch(error =>{
      console.log('user fetch did not work')
    })
  }

  componentDidMount(){
    this.loggedInUser();
  }

  renderDashboard = props => {
    const { user, fetchingUser } = this.state
      return <Dashboard user={user} />
  }

  renderHomepage = props => {
    const { user, fetchingUser } = this.state
      return <Homepage user={user} />
  }

  renderPlanPage = props => {
    const { user, fetchingUser } = this.state
      return <PlanPage user={user} />
  }

  renderProfile = props => {
    const { user, fetchingUser } = this.state
    const { profileID } = props.match.params
      return <Profile user={user} profileID={props.match.params}/>
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" render={this.renderHomepage} />
          <Route exact path="/hangout/:hangoutID" render={this.renderPlanPage} />
          <Route exact path="/dashboard" render={this.renderDashboard} />
          <Route exact path="/profile/:profileID" render={this.renderProfile} />
        </Switch>
      </div>
    );
  }
}

export default App;
