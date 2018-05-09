import React from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router'
import { Redirect } from 'react-router'
import Login from '../Login/Login';
import Register from '../Register/Register';
import './Homepage.css'

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      fetchingUser: true,
    }
  }

  render() {
    const { user } = this.state
    return (
     <div className="homepageContainer">
     <h1 className="homeName"> Rekindle </h1> 

    </div> )
  }
}

export default LandingPage

// <h1> Rekindle makes it easier to schedule hangouts. </h1> 