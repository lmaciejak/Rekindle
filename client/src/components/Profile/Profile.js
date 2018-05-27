import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router";
import { withRouter } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import './Profile.css'


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

  componentDidMount = (props) => {
      this.loadProfile();
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.user_id !== nextProps.user_id) {
      this.loadProfile();
    }
  }

  // componentDidUpdate(prevProps,prevState){
  //   if(prevProps !== this.props){
  //     this.loadProfile()
  //   }
  // }

  loadProfile = (props) => { 
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
  }

  handleAddFriend = () => { 
    axios 
  
  }

  render() {
    const { user } = this.state;
    console.log('state------', this.state)
    console.log('this.state.profileID *****', this.state.profileID)
    return (
      <div className="profilePageContainer">
        <NavBar />
        <div className="profilePageMain">
        <div className="profilePageContent">
        <img className="profileImage" src={this.state.profileInfo.user_img} />
          <h1> {this.state.profileInfo.full_name} </h1>
          <button onClick={this.handleAddFriend}> Add Friend </button> 
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
