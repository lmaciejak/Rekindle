import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
// BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(BigCalendar);

// const 
//   myEventsList = [
//     {
//       id: 0,
//       title: 'All Day Event very long title',
//       allDay: true,
//       start: new Date(2018, 7, 0),
//       end: new Date(2018, 7, 1),
//     },
//     {
//       id: 1,
//       title: 'Long Event',
//       start: new Date(2018, 8, 7),
//       end: new Date(2018, 8, 10),
//     },
  
//     {
//       id: 2,
//       title: 'DTS STARTS',
//       start: new Date(2018, 10, 13, 0, 0, 0),
//       end: new Date(2018, 10, 20, 0, 0, 0),
//     }]

// const Calendar = props => (
//   <div>
//     <BigCalendar
//       events={myEventsList}
//       startAccessor='startDate'
//       endAccessor='endDate'
//     />
//   </div>
// );

// export default Calendar


class Calendar extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ],
    title: "",
    start: "",
    end: "",
    desc: "",
    openSlot: false,
    openEvent: false,
    clickedEvent: {}
  };

  handleEventSelected(event) {
    console.log("event", event);
    this.setState({
      openEvent: true,
      clickedEvent: event,
      start: event.start,
      end: event.end,
      title: event.title,
      desc: event.desc
    });
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

//   onSlotChange(slotInfo) {
//     var startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DDm:ss");
//     var endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DDm:ss");
//     console.log('selected')
// }

onEventClick(event) {
  console.log(event) //Shows the event details provided while booking
}

  render() {
    return (
      <div className="App">
        <DnDCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          selectable={true}
          // onSelectSlot={(slotInfo) => this.dateSelected(slotInfo)}
          // // onSelectSlot={(this.slotSelected)}
          // onSelectEvent={(this.eventSelected)}
          onSelectEvent={event => this.handleEventSelected(event)}
          // onSelectSlot={slotInfo => this.handleSlotSelected(slotInfo)}
          onSelectSlot={slotInfo =>{
            console.log('hello')
            alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                `\nend: ${slotInfo.end.toLocaleString()}` +
                `\naction: ${slotInfo.action}`
            );
          }
        }
          style={{ height: "80vh" }}
          timeslots={2}
        />
      </div>
    );
  }
}

export default Calendar;