import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      fetchingUser: true,
      profileInfo: [],
      profileID: this.props.profileID.profileID,
      reload: false,
      message: "",
      displayEditBtn: false,
      isFriend: ""
    };
  }

  loadProfile = props => {
    axios
      .get(`/users/getprofile/${this.props.profileID["profileID"]}`)
      .then(res => {
        this.setState({
          profileInfo: res.data[0]
        });
      })
      .catch(err => {
        this.setState({
          message: `${err.response}`
        });
      });

    axios
      .get(`/users/checkfriend/${this.props.profileID.profileID}`)
      .then(res => {
        if (res.data[0]) {
          this.setState({
            isFriend: true
          });
        } else {
          this.setState({
            isFriend: false
          });
        }
      })
      .catch(err => {
        this.setState({
          message: `${err.response}`
        });
      });
  };

  componentDidMount = () => {
    this.loadProfile();
  };

  componentWillReceiveProps(props) {
    this.loadProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.loadProfile();
    }
  }

  handleAddFriend = () => {
    axios
      .post(`/users/sendFriendRequest`, {
        friend_requested: this.props.profileID.profileID
      })
      .then(res => {
        this.setState({
          isFriend: true
        });
      })
      .catch(err => {
        this.setState({
          message: `${err.response.data}`
        });
      });
  };

  handleDeleteFriend = () => {
    axios
      .post(`/users/unfriend/${this.props.profileID.profileID}`)
      .then(res => {
        this.setState({
          isFriend: false
        });
      })
      .catch(err => {
        this.setState({
          message: `${err.response.data}`
        });
      });
  };

  render(props) {
    const { user } = this.state;

    console.log("state------", this.state);
    console.log("profile propsssssss", this.props);

    return (
      <div className="profilePageContainer">
        <NavBar />
        <div className="profilePageMain">
          <div className="profilePageContent">
            <img
              className="profileImage"
              src={this.state.profileInfo.user_img}
            />
            <h1> {this.state.profileInfo.full_name} </h1>
            <h4 className="userLocation">
              {" "}
              {this.state.profileInfo.user_location}{" "}
            </h4>
            {parseInt(this.props.profileID.profileID) ===
            parseInt(this.props.user.user_id) ? (
              <button className="addFriendButton"> Edit Profile </button>
            ) : this.state.isFriend ? (
              <button
                className="addFriendButton"
                onClick={this.handleDeleteFriend}
              >
                {" "}
                Unfriend{" "}
              </button>
            ) : (
              <button
                className="addFriendButton"
                onClick={this.handleAddFriend}
              >
                {" "}
                Add Friend{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
