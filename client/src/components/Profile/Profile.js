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
      profileInfo: [], 
      profileID: this.props.profileID['profileID']
    };
  }

  componentDidMount = () => {
    axios
      .get(`/users/getprofile/${this.state.profileID}`)
      .then(res => {
        console.log('RES!!!!!', res)
        this.setState({
          profileInfo: res.data[0]
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
    console.log('state------', this.state)
    console.log('this.state.profileID *****', this.state.profileID)
    return (
      <div className="planPageContainer">
        <NavBar />
        <div className="planPageContent">
          <h1> {this.state.profileInfo.full_name} </h1>
          <button onClick={this.handleAddFriend}> Add Friend </button> 
        </div>
      </div>
    );
  }
}

export default Profile;
