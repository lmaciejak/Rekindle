import React from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const 
  myEventsList = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2018, 7, 0),
      end: new Date(2018, 7, 1),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2018, 8, 7),
      end: new Date(2018, 8, 10),
    },
  
    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(2018, 10, 13, 0, 0, 0),
      end: new Date(2018, 10, 20, 0, 0, 0),
    }]

const Calendar = props => (
  <div>
    <BigCalendar
      events={myEventsList}
      startAccessor='startDate'
      endAccessor='endDate'
    />
  </div>
);

export default Calendar