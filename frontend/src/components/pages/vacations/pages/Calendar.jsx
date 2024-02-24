/* eslint-disable no-underscore-dangle */
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import vacationTypes from '../../../../options/vacationTypes';
import './Calendar.css';
import UpdateVacationAlert from '../components/UpdateVacationAlert';
import {
  getAllVacationsByTimeAndType,
  getVacationById,
} from '../../../../api/vacationsApi';

function Calendar({
  reload, employees, onDelete, onUpdate,
}) {
  const [events, setEvents] = useState(null);
  const [isOpenUpdateeAlert, setIsOpenUpdateAlert] = useState(false);
  const [activeVacation, setActiveVacation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getVacations = async () => {
    setIsLoading(true);
    try {
      const { data } = await getAllVacationsByTimeAndType();

      const dataForEvents = data?.map((doc) => {
        const {
          _id: id,
          startVacation,
          endVacation,
          type,
          name,
          surname,
        } = doc;

        const date = new Date(endVacation);
        date.setDate(date.getDate() + 1);
        const endPlusDay = date.toISOString();

        const backgroundColor = vacationTypes.find(
          (item) => item.label === type,
        )?.color;

        return {
          type,
          start: startVacation,
          end: endPlusDay,
          title: `${name} ${surname} ${type}`,
          allDay: true,
          id,
          backgroundColor:
            backgroundColor
            || vacationTypes.find((item) => item.label === 'inne').color,
        };
      });
      setEvents(dataForEvents);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVacations();
  }, [reload]);

  const handleGetVacationById = async (id) => getVacationById(id);

  const handleEventClick = async (arg) => {
    setIsOpenUpdateAlert(true);
    setActiveVacation(null);
    const id = arg.event._def.publicId;
    const vacation = await handleGetVacationById(id);
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
      {isOpenUpdateeAlert && (
        <UpdateVacationAlert
          open={isOpenUpdateeAlert}
          onClose={handleCloseUpdateAlert}
          vacation={activeVacation}
          employees={employees}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
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
          locale="pl"
          buttonText={{
            today: 'dziś',
          }}
          firstDay={1}
          editable={false}
          eventResizableFromStart
          dayCellClassNames={dayCellClassNames}
        />
      </div>
    </div>
  );
}

export default Calendar;
