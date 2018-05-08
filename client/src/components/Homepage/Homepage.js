import React from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router'
import { Redirect } from 'react-router'
import Login from '../Login/Login';
import Register from '../Register/Register';

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
     <div>
     <h1> Rekindle makes it easier to schedule hangouts. </h1> 
    </div> )
  }
}

export default LandingPage