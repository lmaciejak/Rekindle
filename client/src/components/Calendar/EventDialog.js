import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import moment from "moment";
import TimePicker from "material-ui/TimePicker";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Select from "react-select";


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

    return (
      <Dialog
      title={`Tell your friends you're free on ${moment(this.props.calendarState.start).format(
        "MMMM Do"
      )}`}
      actions={availabilityActions}
      modal={false}
      open={this.props.calendarState.openSlot}
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

// const eventActions = [
//   <FlatButton
//     label="Cancel"
//     primary={false}
//     keyboardFocused={true}
//     onClick={this.handleClose}
//   />,
//   <FlatButton
//     label="Delete"
//     secondary={true}
//     keyboardFocused={true}
//     onClick={() => {
//       this.deleteEvent(), this.handleClose();
//     }}
//   />,
//   <FlatButton
//     label="Confirm Edit"
//     primary={true}
//     keyboardFocused={true}
//     onClick={this.handleClose}
//     onClick={() => {
//       this.updateEvent(), this.handleClose();
//     }}
//   />
// ];
// const appointmentActions = [
//   <FlatButton label="Cancel" secondary={true} onClick={this.handleClose} />,
//   <FlatButton
//     label="Submit"
//     primary={true}
//     keyboardFocused={true}
//     onClick={() => {
//       this.setNewAppointment(), this.handleClose();
//     }}
//   />
// ];

// class SlotAndEventDialog extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       start: "",
//       end: "",
//       desc: "",
//     };
//   }

//   setTitle = e => {
//     this.setState({ title: e });
//   };

//   setDescription = e => {
//     this.setState({ desc: e });
//   };

//   handleStartTime = (event, date) => {
//     this.setState({ start: date });
//   };

//   handleEndTime = (event, date) => {
//     this.setState({ end: date });
//   };

//   render() { 
//     const { selection  } = this.props
//     return (
//       <Dialog
//       title={selection  === 'slot' ? `Alert friends that you are free on: ${moment(
//         this.state.start
//       ).format("MMMM Do")}` : `View/Edit Appointment of ${moment(this.state.start).format(
//         "MMMM Do YYYY"
//       )}`}
//       actions={selection  === 'slot' ? appointmentActions : eventActions}
//       modal={false}
//       open={selection  === 'slot' ? this.state.openEvent : this.state.openSlot}
//       onRequestClose={this.handleClose}
//     >
//       <TextField
//         defaultValue={this.state.title}
//         floatingLabelText="Title"
//         onChange={e => {
//           this.setTitle(e.target.value);
//         }}
//       />
//       <br />
//       <TextField
//         floatingLabelText="Description"
//         multiLine={true}
//         defaultValue={this.state.desc}
//         onChange={e => {
//           this.setDescription(e.target.value);
//         }}
//       />
//       <TimePicker
//         format="ampm"
//         floatingLabelText="Start Time"
//         minutesStep={10}
//         value={this.state.start}
//         onChange={this.handleStartTime}
//       />
//       <TimePicker
//         format="ampm"
//         floatingLabelText="End Time"
//         minutesStep={10}
//         value={this.state.end}
//         onChange={this.handleEndTime}
//       />
//     </Dialog>
//     )
//   }
// }

export default SlotAndEventDialog; 
