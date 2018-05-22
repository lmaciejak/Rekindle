import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import TimePicker from "material-ui/TimePicker";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import SlotAndEventDialog from "./EventDialog";
import freeImage from "../../images/freeicon.png";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
// BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
// BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

BigCalendar.momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(BigCalendar);

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      friendsArr: [],
      availability_id: "",
      events: [],
      title: "",
      start: new Date(),
      end: new Date(),
      description: "",
      openSlot: false,
      openEvent: false,
      clickedEvent: {},
      selection: "",
      selectedFriendsForCalendar: "",
      selectedFriends: "",
      message: "",
      toggleValue: false,
      planInitiated: false,
      hangoutID: ""
    };
  }

  componentDidMount = () => {
    axios
      .get(`/users/getfriends/1`)
      .then(res => {
        console.log("res", res);
        this.setState({
          friendsArr: res.data
        });
      })
      .catch(err => {
        this.setState({
          message: `${err.response}`
        });
      });
    axios
      .get(`/users/getalluseravailabilities`)
      .then(res => {
        let dataFormatted = res.data;

        dataFormatted[0].forEach(elem => {
          elem.end = new Date(elem.end);
          elem.start = new Date(elem.start);
          elem["type"] = "mine";
          elem["title"] = `I'm free`;
        });
        dataFormatted[1].forEach(elem => {
          elem.end = new Date(elem.end);
          elem.start = new Date(elem.start);
          elem["type"] = "friend";
          elem["title"] = `${elem.username}'s free`;
        });

        this.setState({
          events: dataFormatted[0].concat(dataFormatted[1])
        });
      })
      .catch(err => {
        this.setState({
          message: `${err.response}`
        });
      });
  };

  addUserAvailability = () => {
    axios
      .post(`/users/addUserAvailability`, {
        availability_starttime: moment(this.state.start).format(""),
        availability_endtime: moment(this.state.end).format(""),
        availability_title: "free"
      })
      .then(res => {
        this.setState({ availability_id: res.data["availability_id"] });
      })
      .then(() => {
        axios
          .post(`/users/shareavailability/${this.state.availability_id}`, {
            invitees: this.state.selectedFriends
          })
          .then(res => {
            this.setState({
              selectedFriends: ""
            });
          });
      })
      .catch(err => {
        this.setState({
          message: `${err.response.data}`
        });
      });
  };

  closeDialog = () => {
    this.setState({ openEvent: false, openSlot: false, clickedEvent: {} });
  };

  changeTitle = e => {
    console.log("e", e);
    this.setState({ title: e });
  };

  setDescription = e => {
    this.setState({ desc: e });
  };

  handleEventStartTime = (event, date) => {
    console.log("date start", date);
    console.log("event", event);
    this.setState({ start: date });
  };

  handleEventEndTime = (event, date) => {
    this.setState({ end: date });
  };

  setNewAvailability = () => {
    const { start, end, title, desc } = this.state;
    let availability = { title, start, end, desc };
    let events = this.state.events.slice();
    events.push(availability);
    this.setState({ events });
  };

  updateEvent = () => {
    const { title, desc, start, end, events, clickedEvent } = this.state;
    const index = events.findIndex(event => event === clickedEvent);
    const updatedEvent = events.slice();
    updatedEvent[index].title = title;
    updatedEvent[index].desc = desc;
    updatedEvent[index].start = start;
    updatedEvent[index].end = end;
    this.setState({
      events: updatedEvent
    });
  };

  deleteEvent = () => {
    let updatedEvents = this.state.events.filter(
      event => event["start"] !== this.state.start
    );
    this.setState({ events: updatedEvents });
  };

  makePlan = () => {
    console.log("make plan fired");
    axios
      .post(`/users/makehangout`, {
        hangout_availability_id: this.state.clickedEvent.availability_id
      })
      .then(res => {
        console.log("res", res);
        this.setState({ hangoutID: res.data["hangout_id"] });
      })
      .then(() => {
        this.setState({
          planInitiated: true
        });
      });
  };

  handleSlotSelected = slotInfo => {
    console.log("slot clicked");
    this.setState(
      {
        selection: "slot"
      },
      () =>
        this.setState({
          title: "",
          desc: "",
          start: slotInfo.start,
          end: slotInfo.end,
          openSlot: true
        })
    );
  };

  handleEventSelected = event => {
    console.log("event clicked");
    console.log("event", event);
    this.setState(
      {
        selection: "event"
      },
      () =>
        this.setState({
          openEvent: true,
          clickedEvent: event,
          start: event.start,
          end: event.end,
          title: event.title,
          desc: event.desc
        })
    );
  };

  handleFriendSelect = value => {
    const { selectedFriends } = this.state;
    this.setState({
      selectedFriends: value
    });
  };

  handleToggle = value => {
    const { selectedFriends } = this.state;
    this.setState({
      toggleValue: this.state.toggleValue === false ? true : false
    });
  };

  eventStyleGetter = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: "lightblue ",
      color: "black",
      borderRadius: "0px",
      border: "none"
    };

    if (event.type === "friend") {
      newStyle.backgroundColor = "lightgreen";
    }

    return {
      className: "",
      style: newStyle
    };
  };

  render() {
    console.log("this.state", this.state);
    console.log("hangoutID", this.state.hangoutID);
    const { selection } = this.state;

    if (this.state.planInitiated) {
      return <Redirect to={`/hangout/${this.state.hangoutID}`} />;
    }

    return (
      <div id="bigCalendar">
        <BigCalendar
          events={this.state.events}
          views={["month", "week", "agenda"]}
          timeslots={2}
          defaultView="month"
          defaultDate={new Date()}
          selectable
          onSelectEvent={event => this.handleEventSelected(event)}
          onSelectSlot={slotInfo => this.handleSlotSelected(slotInfo)}
          eventPropGetter={this.eventStyleGetter}
        />

        <SlotAndEventDialog
          calendarState={this.state}
          closeDialog={this.closeDialog}
          setNewAvailability={this.setNewAvailability}
          changeTitle={this.changeTitle}
          handleEventStartTime={this.handleEventStartTime}
          handleEventEndTime={this.handleEventEndTime}
          handleFriendSelect={this.handleFriendSelect}
          deleteEvent={this.deleteEvent}
          updatedEvent={this.updateEvent}
          addUserAvailability={this.addUserAvailability}
          handleToggle={this.handleToggle}
          makePlan={this.makePlan}
        />
      </div>
    );
  }
}

export default Calendar;
