import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import TimePicker from "material-ui/TimePicker";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TimePickerExampleSimple from "./TimePicker";
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
      events: [],
      title: "",
      start: "",
      end: "",
      desc: "",
      openSlot: false,
      openEvent: false,
      clickedEvent: {},
      selection: ''
    };
  }

  handleClose = () => {
    this.setState({ openEvent: false, openSlot: false });
  };

  setTitle(e) {
    this.setState({ title: e });
  }

  setDescription(e) {
    this.setState({ desc: e });
  }

  handleStartTime = (event, date) => {
    this.setState({ start: date });
  };

  handleEndTime = (event, date) => {
    this.setState({ end: date });
  };

  setNewAppointment = () => {
    const { start, end, title, desc } = this.state;
    let appointment = { title, start, end, desc };
    let events = this.state.events.slice();
    events.push(appointment);
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
    console.log('slot clicked')
    this.setState({ 
      selection: 'slot'
    }, () => 
    this.setState({
      title: "",
      desc: "",
      start: slotInfo.start,
      end: slotInfo.end,
      openSlot: true
    })
  )
  };

  handleEventSelected = event => {
    console.log('event clicked')
    console.log('event',event)
    this.setState({ 
      selection: 'event'
    }, () => 
    this.setState({
      openEvent: true,
      clickedEvent: event,
      start: event.start,
      end: event.end,
      title: event.title,
      desc: event.desc
    })
  )
  };


  render() {
    console.log("render()");
    console.log('this.state', this.state)
    const { selection } = this.state
    const eventActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        keyboardFocused={true}
        onClick={() => {
          this.deleteEvent(), this.handleClose();
        }}
      />,
      <FlatButton
        label="Confirm Edit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
        onClick={() => {
          this.updateEvent(), this.handleClose();
        }}
      />
    ];
    const appointmentActions = [
      <FlatButton label="Cancel" secondary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.setNewAppointment(), this.handleClose();
        }}
      />
    ];
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


      <Dialog
        title={this.state.selection  === 'slot' ? `Alert friends that you are free on: ${moment(
          this.state.start
        ).format("MMMM Do")}` : `View/Edit Appointment of ${moment(this.state.start).format(
          "MMMM Do YYYY"
        )}`}
        actions={this.state.selection  === 'slot' ? appointmentActions : eventActions}
        modal={false}
        open={this.state.selection  === 'slot' ? this.state.openEvent : this.state.openSlot}
        onRequestClose={this.handleClose}
      >
        <TextField
          defaultValue={this.state.title}
          floatingLabelText="Title"
          onChange={e => {
            this.setTitle(e.target.value);
          }}
        />
        <br />
        <TextField
          floatingLabelText="Description"
          multiLine={true}
          defaultValue={this.state.desc}
          onChange={e => {
            this.setDescription(e.target.value);
          }}
        />
        <TimePicker
          format="ampm"
          floatingLabelText="Start Time"
          minutesStep={10}
          value={this.state.start}
          onChange={this.handleStartTime}
        />
        <TimePicker
          format="ampm"
          floatingLabelText="End Time"
          minutesStep={10}
          value={this.state.end}
          onChange={this.handleEndTime}
        />
      </Dialog>
      </div>
    );
  }
}

export default Calendar;
