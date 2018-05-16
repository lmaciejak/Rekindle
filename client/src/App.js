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

  renderHomepage = props => {
    const { user, fetchingUser } = this.state
    if (fetchingUser) {
      return <div>loading!</div>
    } else if(!user) {
      return <Redirect to='/' />
    } else {
      return <Homepage user={user} />
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/rekindle" render={this.renderHomepage} />
        </Switch>
      </div>
    );
  }
}

export default App;
