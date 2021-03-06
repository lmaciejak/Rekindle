import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Login.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
    // backgroundColor       : 'rgba(44, 226, 135)',
    // borderRadius          : '5px'
  }
};

Modal.setAppElement("#root");

class DemoLogin extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      message: "",
      modalIsOpen: false,
      loggedIn: false,
      toggle: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModalLogin = this.closeModalLogin.bind(this);
  }
  componentWillMount() {}

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModalLogin() {
    this.setState({ modalIsOpen: false, message: "" });
  }

  handleFormInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLoginFormSubmit = e => {
    e.preventDefault();

    axios
      .post("/users/login", {
        username: "Tom",
        password: "testtest"
      })
      .then(res => {
        console.log("res", res);
        this.setState({
          message: "success",
          isLoggedIn: true
        });
      })
      .catch(err => {
        this.setState({
          username: "",
          password: "",
          message: `${err.response.data}`
        });
      });
  };

  render() {
    console.log("message", this.state.message);
    console.log("isloggedin", this.state.isLoggedIn);
    if (this.state.isLoggedIn === true) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="Modal">
        <div>
          {this.state.loggedIn === "loggedIn" ? (
            <button
              onClick={this.handleClickLogOut}
              className="button formButton"
            >
              Log Out
            </button>
          ) : (
            <button className="button formButton" onClick={this.openModal}>
              Demo
            </button>
          )}
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModalLogin}
            style={customStyles}
          >
            <button className="xButton" onClick={this.closeModalLogin}>
              x
            </button>
            <h2 ref={subtitle => (this.subtitle = subtitle)}>Log In</h2>

            <input
              className="input formInput"
              type="text"
              placeholder="Username"
              name="username"
              value="Demo"
            />
            <input
              className="input formInput"
              type="password"
              placeholder="Password"
              name="password"
              value="testtest"
            />
            <button className="formButton" onClick={this.handleLoginFormSubmit}>
              Log in
            </button>

            <p>{this.state.message}</p>
          </Modal>
        </div>
      </div>
    );
  }
}

export default DemoLogin;
