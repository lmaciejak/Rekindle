import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import moment from "moment";
import TimePicker from "material-ui/TimePicker";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Select from "react-select";


class SlotAndEventDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    console.log('props', this.props)

    const stateOptions = this.props.calendarState.friendsArr.map(elem => ({
      value: elem.user_id,
      label: elem.username
    }));

    const availabilityActions = [
      <FlatButton label="Cancel" secondary={true} onClick={this.props.closeDialog} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.props.setNewAvailability(), this.props.closeDialog();
        }}
      />
    ];

    const eventActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={true}
        onClick={this.props.closeDialog}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        keyboardFocused={true}
        onClick={() => {
          this.props.deleteEvent(), this.props.closeDialog();
        }}
      />,
      <FlatButton
        label="Confirm Edit"
        primary={true}
        keyboardFocused={true}
        onClick={this.closeDialog}
        onClick={() => {
          this.props.updateEvent(), this.props.closeDialog();
        }}
      />
    ];

    return (
      <Dialog
      title={`Tell your friends you're free on ${moment(this.props.calendarState.start).format(
        "MMMM Do"
      )}`}
      actions={availabilityActions}
      modal={false}
      open={this.props.calendarState.openSlot}
      onRequestClose={this.props.closeDialog}
    >
      <TextField
        floatingLabelText="Suggest an activity"
        name="title"
        onChange={e => {
          this.props.changeTitle(e.target.value);
        }}
      />
      <br />
      <TimePicker
        defaultTime="19:00:00"
        format="ampm"
        floatingLabelText="Starting At"
        minutesStep={5}
        value={this.props.calendarState.start}
        onChange={this.props.handleEventStartTime}
      />
      <TimePicker
        defaultTime="22:00:00"
        format="ampm"
        floatingLabelText="Ending At"
        minutesStep={5}
        value={this.props.calendarState.end}
        onChange={this.props.handleEventEndTime}
      />
      <Select 
      name="form-field-name"
      multi
      value={this.props.calendarState.selectedFriends}
      onChange={this.props.handleFriendSelect}
      options={stateOptions}
      placeholder="Share availability with friends"/>
    </Dialog>
    )
  }
}

export default SlotAndEventDialog; 
