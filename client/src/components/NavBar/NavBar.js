import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import Modal from "react-modal";
import "./NavBar.css";
import dashboard from "../../images/dashboard.png";
import calendar from "../../images/calendar.png";
import hangout from "../../images/hangout.png";
import logout from "../../images/logout.png";

function getSuggestionValue(suggestion) {
  return suggestion.full_name;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.full_name}</span>;
}

Modal.setAppElement("#root");

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      value: "",
      suggestions: [],
      redirect: false,
      redirectLanding: false,
      modalIsOpen: false,
      finalSuggestion: "",
      message: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleClickLogout = e => {
    axios
      .get(`/users/logout`)
      .then(res => {
        this.setState({
          message: res.data,
          redirectLanding: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleModalClick = e => {
    this.setState({
      modalIsOpen: false
    });
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, message: "", redirect: false });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    fetch(`/users/searchbyuser/${value}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          suggestions: data
        });
      });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.setState({
      finalSuggestion: [suggestion],
      redirect: true,
      value: "",
      modalIsOpen: true
    });
  };

  showSettings(event) {
    event.preventDefault();
  }

  render() {
    console.log("finalsuggestion", this.state.finalSuggestion);
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Find your friends",
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };
    if (this.state.redirect) {
      return (
        <Switch>
          <Redirect to={`/profile/${this.state.finalSuggestion[0].user_id}`} />{" "}
        </Switch>
      );
    }

    if(this.state.redirectLanding) {
      return <Redirect to='/' />
    }

    return (
      <div className="searchbar">
        <Link to={"/home"} className="rekindleLink">
          {" "}
          <h1 className="searchBarName"> Rekindle </h1>
        </Link>

        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />
        <div className="iconContainer">
          <Link to={"/dashboard"} className="rekindleLink tooltip">
            {" "}
            <img src={dashboard} className="navIcon" />
            <span className="tooltiptext">Dashboard</span>
          </Link>
          <Link to={"/home"} className="rekindleLink tooltip">
            {" "}
            <img src={calendar} className="navIcon" />{" "}
            <span className="tooltiptext">Calendar</span>
          </Link>
          <Link to={"/hangouts"} className="rekindleLink tooltip">
            {" "}
            <img src={hangout} className="navIcon" />{" "}
            <span className="tooltiptext">Hangouts</span>
          </Link>
          <div onClick={this.handleClickLogout} className="rekindleLink tooltip">
          {" "}
          <img src={logout} className="navIcon" />{" "}
          <span className="tooltiptext">Logout</span>
        </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
