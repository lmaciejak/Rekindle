import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import Modal from "react-modal";
import './NavBar.css'

function getSuggestionValue(suggestion) {
  return suggestion.identifier;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.identifier}</span>;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "15%",
    height: "28%",
    textAlign: "center"
  }
};

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

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    fetch(`/users/searchbyrecipe/${value}`)
      .then(response => response.json())
      .then(data => {
        const dataFormatted = data.map((elem, index) => {
          if (index === 0) {
            return { title: "recipe name", info: elem };
          }
          if (index === 1) {
            return { title: "username", info: elem };
          }
          if (index === 2) {
            return { title: "full name", info: elem };
          }
        });

        const newData = dataFormatted
          .map(elem => elem.info)
          .reduce((prev, curr) => prev.concat(curr));

        this.setState({
          suggestions: newData,
          searchInput: data
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
    const { value, suggestions, redirectLanding } = this.state;
    const inputProps = {
      placeholder: "Search for friends",
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };

    return (
      <div className="searchbar">
        <Link to={`/cb/feed`}>
          <img className="searchbarLogo hoverIncrease" />
        </Link>
        <h1 className="searchBarName"> Rekindle </h1>

        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />

        {this.state.finalSuggestion
          ? this.state.finalSuggestion.map(elem => {
              const link = elem.recipe_id
                ? `/cb/${elem.username}/${elem.recipe_id}`
                : `/cb/profile/${elem.user_id}`;
              return (
                <Link
                  to={link}
                  className="searchLink"
                  onClick={this.handleModalClick}
                >
                  <p key={Math.random()}> {elem.identifier} </p>
                </Link>
              );
            })
          : "no results"}
        <br />
        <button onClick={this.closeModal}>close</button>
      </div>
    );
  }
}

export default NavBar;
