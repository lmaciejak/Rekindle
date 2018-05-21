import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import moment from "moment";
import TimePicker from "material-ui/TimePicker";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Select from "react-select";
// import "./react-select.css";



class SlotAndEventDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedFriends: ""
    };
  }


  render() {
    console.log("props********", this.props);

    const stateOptions = this.props.calendarState.friendsArr.map(elem => ({
      value: elem.user_id,
      label: elem.username
    }));

    const availabilityActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.props.closeDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.props.setNewAvailability(), this.props.closeDialog(), this.props.addUserAvailability();
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
        title={
          this.props.calendarState.selection === "slot"
            ? `Tell your friends you're free on ${moment(
                this.props.calendarState.start
              ).format("MMMM Do")}`
            :  this.props.calendarState.clickedEvent.type === 'friend' ? `Your Friend's Availability on ${moment(
              this.props.calendarState.start
            ).format("MMMM Do")}` : `Edit your availability on ${moment(
                this.props.calendarState.start
              ).format("MMMM Do")}`
        }
        actions={
          this.props.calendarState.selection === "slot"
            ? availabilityActions
            : eventActions
        }
        modal={false}
        open={
          this.props.calendarState.selection === "slot"
            ? this.props.calendarState.openSlot
            : this.props.calendarState.openEvent
        }
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
        color="primary"
          affix="pm"
          format="ampm"
          defaultTime={this.props.calendarState.start}
          floatingLabelText="Starting At"
          minutesStep={5}
          value={this.props.calendarState.start}
          onChange={this.props.handleEventStartTime}
        />
        <TimePicker
        color="secondary"
          affix="pm"
          format="ampm"
          floatingLabelText="Ending At"
          minutesStep={5}
          defaultValue={this.props.calendarState.end}
          value={this.props.calendarState.end}
          onChange={this.props.handleEventEndTime}

        />
        <Select
          name="form-field-name"
          multi
          value={this.props.calendarState.selectedFriends}
          onChange={this.props.handleFriendSelect}
          options={stateOptions}
          placeholder="Share availability with friends"
        />
        <br />
        <br />
        <br />
        <br />
        {this.props.calendarState.clickedEvent.type ? this.props.calendarState.clickedEvent.type === 'friend' ? 
        <div>  <FlatButton  label="make plans" primary={true} /></div> : 
        '' : ''}
    
      </Dialog>
    );
  }
}

export default SlotAndEventDialog;
