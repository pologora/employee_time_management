import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const urlop = [
  {
    type: 'wypoczynkowy',
    start: '2023-03-21',
    end: '2023-03-25',
    name: 'Michał Kowalski',
    title: 'Michał Kowalski wypoczynkowy',
    allDay: true,
  },
  {
    type: 'wypoczynkowy',
    start: '2023-03-21',
    end: '2023-03-23',
    name: 'Michał Kowalski',
    title: 'Lina Białowa wypoczynkowy',
    allDay: true,
  },
  {
    type: 'wypoczynkowy',
    start: '2023-03-21',
    end: '2023-03-29',
    name: 'Michał Kowalski',
    title: 'Ola Kulemina wypoczynkowy',
    allDay: true,
  },
  {
    type: 'wypoczynkowy',
    start: '2023-02-02',
    end: '2023-02-12',
    name: 'Kris Moel',
    title: 'Kris Moel wypoczynkowy',
    allDay: true,
  },
  {
    type: 'zwolnienie lekarskie',
    start: '2023-03-03',
    end: '2023-03-08',
    name: 'Ola Wierzyczka',
    title: 'Ola Wierzyczka zwolnienie lekarskie',
    allDay: true,
  },
  {
    type: 'wolny za sobotę',
    start: '2023-03-15',
    end: '2023-03-16',
    name: 'Ola Wierzyczka',
    title: 'Ola Wierzyczka wolny za sobotę',
    allDay: true,
  },
];

function Calendar() {
  const handleDateClick = (arg) => {
    // Handle date click event here, e.g. show a modal for adding a new event
    alert(`Date clicked: ${arg.dateStr}`);
  };

  const handleEventClick = (arg) => {
    // Handle event click event here, e.g. show a modal with event details
    alert(`Event clicked: ${arg.event.title}`);
  };

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
        }}
        initialView="dayGridMonth"
        events={urlop}
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
