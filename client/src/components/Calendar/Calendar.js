import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import TimePicker from "material-ui/TimePicker";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Select from "react-select";
import axios from "axios";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import SlotAndEventDialog from "./EventDialog";

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
      events: [{
        end: new Date('Thu May 17 2018 15:00:00 GMT-0400 (EDT)'),
        start: new Date('Thu May 17 2018 14:10:00 GMT-0400 (EDT)'),
        title:'yoga'}],
      title: "",
      start: "",
      end: "",
      description: "",
      openSlot: false,
      openEvent: false,
      clickedEvent: {},
      selection: "",
      selectedFriends: ""
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
  };

  closeDialog = () => {
    this.setState({ openEvent: false, openSlot: false });
  };

  changeTitle = e => {
    console.log("e", e);
    this.setState({ title: e });
  };

  setDescription = e => {
    this.setState({ desc: e });
  };

  handleEventStartTime = (event, date) => {
    console.log('date start', date)
    console.log('event', event)
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

  submitAvailabilityToFriend = e => {
    axios
      .post(`/users/addInviteeToPotluck/${this.props.potluckID["potluckID"]}`, {
        invitees: this.state.selectedValues
      })
      .then(() => {
        axios
          .get(
            `/users/getNewInviteesPotluck/${
              this.props.potluckID["potluckID"]
            }/${this.state.potluck_info.organizer_id}`
          )
          .then(res => {
            this.setState({
              following: res.data,
              selectedValues: ""
            });
          });
      })
      .then(() => {
        axios
          .get(`/users/getsinglepotluck/${this.props.potluckID["potluckID"]}`)
          .then(res => {
            this.setState({
              potluck_invitations: res.data[1]
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("render()");
    console.log("this.state", this.state);
    console.log('this.state.start', this.state.start)
    const { selection } = this.state;
    console.log('date format', moment('Thu May 17 2018 15:00:00 GMT-0400 (EDT)').format('YYYY MM DD'))

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
        />
      </div>
    );
  }
}

export default Calendar;
