import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import baseUrl from '../../../../options/baseUrl';
import vacationTypes from '../../../../options/vacationTypes';
import './Calendar.css';

function Calendar() {
  const [events, setEvents] = useState(null);
  const { get, isLoading } = useAxios();

  const getVacations = async () => {
    const url = `${baseUrl}/vacations/time`;
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
      const backgroundColor = vacationTypes.find(
        (item) => item.label === type,
      ).color;
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
        backgroundColor,
      };
    });
    setEvents(dataForEvents);
  };

  useEffect(() => {
    getVacations();
  }, []);

  const handleEventClick = (arg) => {
    // Handle event click event here, e.g. show a modal with event details
    alert(`Event clicked: ${arg.event.title}`);
    console.log(arg);
  };

  const dayCellClassNames = ({ date }) => {
    const day = date.getDay();
    if (day === 0 || day === 6) {
      return ['weekend'];
    }
    return [];
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
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        selectable
        firstDay={1}
        editable={false}
        eventResizableFromStart
        dayCellClassNames={dayCellClassNames}
      />
    </div>
  );
}

export default Calendar;
