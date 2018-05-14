import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import moment from "moment";
import TimePicker from "material-ui/TimePicker";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

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

class SlotAndEventDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      start: "",
      end: "",
      desc: "",
    };
  }

  setTitle = e => {
    this.setState({ title: e });
  };

  setDescription = e => {
    this.setState({ desc: e });
  };

  handleStartTime = (event, date) => {
    this.setState({ start: date });
  };

  handleEndTime = (event, date) => {
    this.setState({ end: date });
  };

  render() { 
    const { selection  } = this.props
    return (
      <Dialog
      title={selection  === 'slot' ? `Alert friends that you are free on: ${moment(
        this.state.start
      ).format("MMMM Do")}` : `View/Edit Appointment of ${moment(this.state.start).format(
        "MMMM Do YYYY"
      )}`}
      actions={selection  === 'slot' ? appointmentActions : eventActions}
      modal={false}
      open={selection  === 'slot' ? this.state.openEvent : this.state.openSlot}
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
    )
  }
}

export default SlotAndEventDialog; 
