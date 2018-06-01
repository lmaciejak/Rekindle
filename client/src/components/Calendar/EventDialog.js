import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import moment from "moment";
import TimePicker from "material-ui/TimePicker";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Select from "react-select";
import Toggle from "material-ui/Toggle";
import axios from "axios";

class SlotAndEventDialog extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    console.log("dialogPROPA", this.state);   
    console.log("dialogPROPA2", this.props);

    const stateOptions = this.props.calendarState.friendsArr.map(elem => ({
      value: elem.user_id,
      label: elem.username
    }));

    const confirmPlan = [
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={true}
        onClick={this.props.closeDialog}
      />,
      <FlatButton
        label="Confirm hangout"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.props.makePlan();
        }}
      />
    ];

    const planActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={true}
        onClick={this.props.closeDialog}
      />,
      <FlatButton
        label="Make Plans"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.props.makePlan();
        }}
      />
    ];

    const availabilityActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.props.closeDialog}
      />,
      <FlatButton
        label="Share"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.props.setNewAvailability(),
            this.props.closeDialog(),
            this.props.addUserAvailability();
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
            : this.props.calendarState.clickedEvent.stage === "plan"
              ? `Planned meetup with ${
                  this.props.calendarState.clickedEvent.username
                }`
              : this.props.calendarState.clickedEvent.type === "friend"
                ? `${
                    this.props.calendarState.clickedEvent.username
                  }'s Availability on ${moment(
                    this.props.calendarState.start
                  ).format("MMMM Do")}`
                : `Edit your availability on ${moment(
                    this.props.calendarState.start
                  ).format("MMMM Do")}`
        }
        actions={
          this.props.calendarState.selection === "slot"
            ? availabilityActions
            : this.props.calendarState.clickedEvent.stage === "plan"
              ? confirmPlan
              : this.props.calendarState.clickedEvent.type === "friend"
                ? planActions
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
        <br />
        <TimePicker
          color="primary"
          affix="pm"
          format="ampm"
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
          value={this.props.calendarState.end}
          onChange={this.props.handleEventEndTime}
        />
        {this.props.calendarState.selection !== "slot"
          ?  <div>Availability shared with {this.props.calendarState.invitedFriends[0] ? this.props.calendarState.invitedFriends.map(elem => (
              <li className="invitedFriends">{elem.username}</li>
            )) : 'none of your friends yet'
          } </div>: ""}
        <Select
          name="form-field-name"
          multi
          value={this.props.calendarState.selectedFriends}
          onChange={this.props.handleFriendSelect}
          options={stateOptions}
          placeholder={this.props.calendarState.invitedFriends[0] ? "Share availability with more of your friends" : "Share availability with friends"}
        />
        {this.props.calendarState.clickedEvent.type === "friend" ? (
          <div>
            {" "}
            Are you also available?{" "}
            <Toggle onToggle={this.props.handleToggle} />{" "}
          </div>
        ) : (
          ""
        )}
        <br />
        <br />
        <br />
        <br />
      </Dialog>
    );
  }
}

export default SlotAndEventDialog;

// <TextField
// floatingLabelText="Suggest an activity"
// name="title"
// onChange={e => {
//   this.props.changeTitle(e.target.value);
// }}
// />
