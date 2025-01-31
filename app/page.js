"use client"
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const TaskModal = dynamic(() => import('./TaskModal'), { ssr: false });

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Home() {
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    desc: '',
    color: '#FFA500',
    start: new Date(),
    end: new Date(),
  });

  const handleDateClick = (date) => {
    setNewEvent({ ...newEvent, start: date, end: date });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = () => {
    setEvents([...events, { ...newEvent, id: events.length }]);
    setIsModalOpen(false);
    setNewEvent({ title: '', desc: '', color: '#FFA500', start: newEvent.start, end: newEvent.end });
  };

  const handleNavigate = (action) => {
    if (action === 'TODAY') {
      setCurrentDate(new Date());
    } else {
      const newDate = currentView === Views.MONTH
        ? action === 'PREV' ? new Date(currentDate.setMonth(currentDate.getMonth() - 1)) : new Date(currentDate.setMonth(currentDate.getMonth() + 1))
        : action === 'NEXT' ? new Date(currentDate.setDate(currentDate.getDate() + 7)) : new Date(currentDate.setDate(currentDate.getDate() - 7));
      setCurrentDate(newDate);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-6">Georgia Project Scrum Manager</h1>
      <div className="flex mb-4 space-x-2">
        <button onClick={() => handleNavigate('TODAY')} className="px-4 py-2 bg-gray-200 rounded-md">Today</button>
        <button onClick={() => handleNavigate('PREV')} className="px-4 py-2 bg-gray-200 rounded-md">Back</button>
        <button onClick={() => handleNavigate('NEXT')} className="px-4 py-2 bg-gray-200 rounded-md">Next</button>
        <button onClick={() => handleViewChange(Views.MONTH)} className="px-4 py-2 bg-gray-200 rounded-md">Month</button>
        <button onClick={() => handleViewChange(Views.WEEK)} className="px-4 py-2 bg-gray-200 rounded-md">Week</button>
        <button onClick={() => handleViewChange(Views.DAY)} className="px-4 py-2 bg-gray-200 rounded-md">Day</button>
        <button onClick={() => handleViewChange(Views.AGENDA)} className="px-4 py-2 bg-gray-200 rounded-md">Agenda</button>
      </div>
      <div style={{ width: '80%', height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={currentView}
          date={currentDate}
          onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)}
          selectable
          style={{ height: 500 }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color,
            },
          })}
        />
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        addEvent={addEvent}
        newEvent={newEvent}
        handleInputChange={handleInputChange}
      />
    </main>
  );
}
