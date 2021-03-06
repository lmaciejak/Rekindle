import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Redirect } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    textAlign: "center"
  }
};

Modal.setAppElement("#root");

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      confirmpassword: "",
      full_name: "",
      email: "",
      isLoggedIn: false,
      message: "",
      modalIsOpen: false,
      loggedInForRegister: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, message: "" });
  }

  componentWillMount() {
    axios
      .get("/isloggedIn")
      .then(res => {
        this.setState({
          loggedInForRegister: res.data
        });
      })
      .catch(err => {
        this.setState({
          loggedInForRegister: err.response.status
        });
      });
  }

  handleFormInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLoginFormSubmit = e => {
    e.preventDefault();

    const { username, password, email, full_name } = this.state;
    console.log("this.state login form submit", this.state);
    axios
      .post("/users/register", {
        username: username,
        password: password,
        email: email,
        full_name: full_name
      })
      .then(() => {
        axios
          .post("/users/login", {
            username: username,
            password: password
          })
          .catch(error => {
            console.log("login fail after register");
          });
      })
      .then(res => {
        this.setState({
          message: "success",
          isLoggedIn: true
        });
      })
      .catch(err => {
        this.setState({
          message: `Error registering. ${err.response.data.detail}`
        });
      });
  };

  render() {
    const { password, isLoggedIn } = this.state;
    if (this.state.isLoggedIn === true) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="Modal">
        <div>
          {this.state.loggedInForRegister !== "loggedIn" ? (
            <button className="button formButton" onClick={this.openModal}>
              Register
            </button>
          ) : (
            ""
          )}
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <button className="xButton" onClick={this.closeModal}>
              x
            </button>
            <h2 ref={subtitle => (this.subtitle = subtitle)}>Register</h2>
            <form onSubmit={this.handleLoginFormSubmit}>
              <input
                className="input formInput"
                type="text"
                placeholder="Username"
                onChange={this.handleFormInput}
                name="username"
                required
              />{" "}
              <br />
              <input
                className="input formInput"
                type="text"
                placeholder="Fullname"
                onChange={this.handleFormInput}
                name="full_name"
                required
              />{" "}
              <br />
              <input
                className="input formInput"
                type="email"
                placeholder="Email"
                onChange={this.handleFormInput}
                name="email"
                required
              />{" "}
              <br />
              <input
                className="input formInput"
                type="password"
                placeholder="Password"
                onChange={this.handleFormInput}
                name="password"
                required
              />{" "}
              <br />
              <input
                className="input formInput"
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleFormInput}
                name="confirmpassword"
                required
              />{" "}
              <br />
              <br />
              <button className="formButton">Register</button>
            </form>
            <p> {this.state.message} </p>
            <p>
              {" "}
              {this.state.password !== this.state.confirmpassword &&
              this.state.confirmpassword
                ? "passwords do not match"
                : ""}{" "}
            </p>
            <p>
              {" "}
              {password && password.length < 6
                ? "password must be 6 characters"
                : ""}{" "}
            </p>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Register;
