import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import TimePicker from "material-ui/TimePicker";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
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
      availability_id: '',
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
      selectedFriends: '',
      message: ''
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
        let dataFormatted = res.data

        dataFormatted[0].forEach((elem) => { 
          elem.end = new Date(elem.end);
        elem.start = new Date(elem.start);
        elem['type'] = 'mine'
        elem['title'] = `i'm free`
        })
        dataFormatted[1].forEach((elem) => {
          elem.end = new Date(elem.end);
          elem.start = new Date(elem.start);
          elem['type'] = 'friend'
          elem['title'] = `${elem.username} is free`
          })

        this.setState({ 
          events: dataFormatted[0].concat(dataFormatted[1])
        })
      })
      .catch(err => {
        this.setState({
          message: `${err.response}`
        });
      })
  };

  addUserAvailability = () => { 
    axios
      .post(`/users/addUserAvailability`, {
        availability_starttime: moment(this.state.start).format(''),
        availability_endtime: moment(this.state.end).format(''), 
        availability_title: "free"
      })
      .then(res => {
        this.setState({ availability_id: res.data['availability_id']})
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
  }

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

  eventStyleGetter = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: "lightblue ",
      color: 'black',
      borderRadius: "0px",
      border: "none"
    };

    if (event.type === 'friend'){
      newStyle.backgroundColor = "lightgreen"
    }

    return {
      className: "",
      style: newStyle
    };
  }



  render() {
    console.log("this.state", this.state);
    const { selection } = this.state;
    // console.log('date format', moment('Thu May 17 2018 15:00:00 GMT-0400 (EDT)').format('YYYY-MM-DD HH:MM:SS'))
    //     console.log('date format***', moment('Thu May 17 2018 15:00:00 GMT-0400 (EDT)').format())
    // console.log('date a different try', new Date('Thu May 17 2018 15:00:00 GMT-0400 (EDT)').getTime())
    // console.log('second date format', new Date('2018-05-18T06:05:00.000Z'))
    // let someDate = new Date('Thu May 17 2018 15:00:00 GMT-0400 (EDT)')
    // console.log('*****', moment.unix(1526583600000).utc())
    // console.log('****',  moment('Thu May 17 2018 15:00:00 GMT-0400 (EDT)', 'YYYY-MM-DD HH:MM:SS'))
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
          eventPropGetter={(this.eventStyleGetter)}
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
        />
      </div>
    );
  }
}

export default Calendar;
