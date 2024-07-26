// src/pages/CalendarPage.jsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Assurez-vous d'importer les styles du calendrier
import './CalendarPage.css'
function CalendarPage() {
  const [date, setDate] = React.useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar-page">
      <h1>Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
    </div>
  );
}

export default CalendarPage;
