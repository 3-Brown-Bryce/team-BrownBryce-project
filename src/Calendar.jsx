import { useState } from 'react';
import './Calendar.css';

export default function Calendar({ setPage }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3));
  
  // 1. Track two dates instead of one
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const dates = [];
  for (let i = 0; i < firstDay; i++) dates.push(null);
  for (let i = 1; i <= totalDays; i++) dates.push(i);

  // 2. Logic to handle range selection
  const handleDateClick = (day) => {
    if (!day) return;
    
    if (!startDate || (startDate && endDate)) {
      // Start a new range
      setStartDate(day);
      setEndDate(null);
    } else if (day < startDate) {
      // If user clicks a date before start, reset start
      setStartDate(day);
    } else if (day > startDate) {
      // Complete the range
      setEndDate(day);
    }
  };

  const changeMonth = (dir) => {
    setCurrentDate(new Date(year, month + dir));
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="container">
      <div className="header">Calendar</div>
      <div className="calendar-card">
        <div className="calendar-top">
          <button className="small-btn" onClick={() => changeMonth(-1)}>Previous</button>
          <h2>{monthNames[month]} {year}</h2>
          <button className="small-btn" onClick={() => changeMonth(1)}>Next</button>
        </div>

        <div className="calendar-grid">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-header">{day}</div>
          ))}
          {dates.map((day, i) => {
            // 3. Highlight the range in the UI
            const isSelected = day === startDate || day === endDate;
            const isInRange = day > startDate && day < endDate;

            return (
              <div
                key={i}
                className={`date-box ${day ? 'active' : 'empty'} 
                  ${isSelected ? 'selected' : ''} 
                  ${isInRange ? 'in-range' : ''}`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>

        <button className="big-btn" onClick={() => {
          if (startDate && endDate) {
            alert(`Range: ${monthNames[month]} ${startDate} to ${endDate}, ${year}`);
          } else {
            alert("Select a start and end date!");
          }
        }}>
          Confirm Range
        </button>
        
        <button className="small-btn" onClick={() => setPage('home')}>Back</button>
      </div>
    </div>
  );
}
