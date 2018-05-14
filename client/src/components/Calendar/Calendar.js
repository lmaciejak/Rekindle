import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import TimePicker from "material-ui/TimePicker";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Select from "react-select";

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
      description: "",
      openSlot: false,
      openEvent: false,
      clickedEvent: {},
      selection: ''
    };
  }

  closeDialog = () => {
    this.setState({ openEvent: false, openSlot: false });
  };

  changeTitle(e) {
    console.log('e', e)
    this.setState({ title: e });
  }

  setDescription(e) {
    this.setState({ desc: e });
  }

  handleEventStartTime = (event, date) => {
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
        onClick={this.closeDialog}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        keyboardFocused={true}
        onClick={() => {
          this.deleteEvent(), this.closeDialog();
        }}
      />,
      <FlatButton
        label="Confirm Edit"
        primary={true}
        keyboardFocused={true}
        onClick={this.closeDialog}
        onClick={() => {
          this.updateEvent(), this.closeDialog();
        }}
      />
    ];
    const availabilityActions = [
      <FlatButton label="Cancel" secondary={true} onClick={this.closeDialog} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.setNewAvailability(), this.closeDialog();
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
        title={`Tell your friends you're free on ${moment(this.state.start).format(
          "MMMM Do"
        )}`}
        actions={availabilityActions}
        modal={false}
        open={this.state.openSlot}
        onRequestClose={this.closeDialog}
      >
        <TextField
          floatingLabelText="Suggest an activity"
          name="title"
          onChange={e => {
            this.changeTitle(e.target.value);
          }}
        />
        <br />
        <TextField
          floatingLabelText="Description"
          name="description"
          onChange={e => {
            this.setDescription(e.target.value);
          }}
        />
        <TimePicker
          defaultTime="19:00:00"
          format="ampm"
          floatingLabelText="Starting At"
          minutesStep={5}
          value={this.state.start}
          onChange={this.handleEventStartTime}
        />
        <TimePicker
          defaultTime="22:00:00"
          format="ampm"
          floatingLabelText="Ending At"
          minutesStep={5}
          value={this.state.end}
          onChange={this.handleEventEndTime}
        />
        <Select 
        name="form-field-name"
        multi
        placeholder="Share availability with friends"/>
      </Dialog>

      <Dialog
      title={`Edit your availability on this day ${moment(this.state.start).format(
        "MMMM Do"
      )}`}
      actions={eventActions}
      modal={false}
      open={this.state.openEvent}
      onRequestClose={this.closeDialog}
    >
      <TextField
        defaultValue={this.state.title}
        floatingLabelText="Suggest an activity"
        onChange={e => {
          this.changeTitle(e.target.value);
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
        floatingLabelText="Starting At"
        minutesStep={5}
        value={this.state.start}
        onChange={this.handleEventStartTime}
      />
      <TimePicker
        format="ampm"
        floatingLabelText="Ending At"
        minutesStep={5}
        value={this.state.end}
        onChange={this.handleEventEndTime}
      />
    </Dialog>
      </div>
    );
  }
}

export default Calendar;
