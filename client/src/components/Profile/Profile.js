import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router";
import NavBar from "../NavBar/NavBar";


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      fetchingUser: true,
      hangoutInfo: [], 
      profileID: this.props.profileID['profileID']
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

  handleAddFriend = () => { 
    axios 
  
  }

  render() {
    const { user } = this.state;
    console.log('this.state.profileID *****', this.state.profileID)
    return (
      <div className="planPageContainer">
        <NavBar />
        <div className="planPageContent">
          <h1> User Profile Page </h1>
          <button onClick={this.handleAddFriend}> Add Friend </button> 
        </div>
      </div>
    );
  }
}

export default Profile;
