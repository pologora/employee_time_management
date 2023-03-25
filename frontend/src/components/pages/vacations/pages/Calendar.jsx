/* eslint-disable no-underscore-dangle */
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
import UpdateVacationAlert from '../components/UpdateVacationAlert';

function Calendar({
  reload, employees, onDelete, onUpdate,
}) {
  const [events, setEvents] = useState(null);
  const [isOpenUpdateeAlert, setIsOpenUpdateAlert] = useState(false);
  const [activeVacation, setActiveVacation] = useState(null);
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

      const date = new Date(endVacation);
      date.setDate(date.getDate() + 1);
      const endPlusDay = date.toISOString();

      const backgroundColor = vacationTypes.find(
        (item) => item.label === type,
      ).color;
      return {
        type,
        start: startVacation,
        end: endPlusDay,
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
  }, [reload]);

  const getVacationById = async (id) => {
    const url = `${baseUrl}/vacations/id?id=${id}`;
    return get(url);
  };
  const handleEventClick = async (arg) => {
    setIsOpenUpdateAlert(true);
    setActiveVacation(null);
    const id = arg.event._def.publicId;
    const vacation = await getVacationById(id);
    if (vacation) {
      setActiveVacation(vacation);
    }
  };

  const handleCloseUpdateAlert = () => {
    getVacations();
    setIsOpenUpdateAlert(false);
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
    <div>
      <UpdateVacationAlert
        open={isOpenUpdateeAlert}
        onClose={handleCloseUpdateAlert}
        vacation={activeVacation}
        employees={employees}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
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
          nextDayThreshold="00:00:00"
        />
      </div>
    </div>
  );
}

export default Calendar;
