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
     <Login />
     <Register />
    </div> )
  }
}

export default LandingPage