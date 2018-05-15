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
    this.state = {
    };
  }

  render() { 
    console.log('props', this.props)
    const { selection  } = this.props

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
          this.setNewAvailability(), this.props.closeDialog();
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
        value={this.props.calendarState.start}
        onChange={this.handleEventStartTime}
      />
      <TimePicker
        defaultTime="22:00:00"
        format="ampm"
        floatingLabelText="Ending At"
        minutesStep={5}
        value={this.props.calendarState.end}
        onChange={this.handleEventEndTime}
      />
      <Select 
      name="form-field-name"
      multi
      value={this.props.calendarState.selectedFriends}
      onChange={this.handleFriendSelect}
      options={stateOptions}
      placeholder="Share availability with friends"/>
    </Dialog>
    )
  }
}

export default SlotAndEventDialog; 
