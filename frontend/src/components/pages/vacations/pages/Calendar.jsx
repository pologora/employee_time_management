/* eslint-disable no-underscore-dangle */
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import baseUrl from '../../../../options/baseUrl';

// const urlop = [
//   {
//     type: 'wypoczynkowy',
//     start: '2023-03-21',
//     end: '2023-03-25',
//     name: 'Michał Kowalski',
//     title: 'Michał Kowalski wypoczynkowy',
//     allDay: true,
//   },
// ];

function Calendar() {
  const [events, setEvents] = useState(null);
  const { get, isLoading } = useAxios();

  const handleDatesSet = async (arg) => {
    const { start, end } = arg;
    const url = `${baseUrl}/vacations/time?start=${start.toISOString()}&end=${end.toISOString()}`;
    const data = await get(url);

    const dataForEvents = data?.map((doc) => {
      const {
        _id: id,
        employeeId,
        startVacation,
        endVacation,
        type,
        name,
        surname,
        duration,
      } = doc;
      return {
        type,
        start: startVacation,
        end: endVacation,
        name,
        surname,
        title: `${name} ${surname} ${type}`,
        allDay: true,
        duration,
        employeeId,
        id,
      };
    });
    setEvents(dataForEvents);
  };

  const handleDateClick = (arg) => {
    // Handle date click event here, e.g. show a modal for adding a new event
    alert(`Date clicked: ${arg.dateStr}`);
  };

  const handleEventClick = (arg) => {
    // Handle event click event here, e.g. show a modal with event details
    alert(`Event clicked: ${arg.event.title}`);
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
        }}
        datesSet={handleDatesSet}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        selectable
        editable={false}
        eventResizableFromStart
      />
    </div>
  );
}

export default Calendar;
