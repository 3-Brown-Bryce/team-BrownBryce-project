
import { useState } from "react";
import "./Calendar.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3));
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const dates = [];

  for (let i = 0; i < firstDay; i++) dates.push(null);
  for (let i = 1; i <= totalDays; i++) dates.push(i);

  const changeMonth = (dir) => {
    setCurrentDate(new Date(year, month + dir));
    setSelectedDate(null);
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

          {dates.map((day, i) => (
            <div
              key={i}
              className={`date-box 
                ${day ? "active" : "empty"} 
                ${day === selectedDate ? "selected" : ""}`}
              onClick={() => day && setSelectedDate(day)}
            >
              {day}
            </div>
          ))}
        </div>

        <button
          className="big-btn"
          onClick={() => {
            if (selectedDate) {
              alert(`You Selected: ${monthNames[month]} ${selectedDate}, ${year}`);
            } else {
              alert("Select a date first!");
            }
          }}
        >
          Select Date
        </button>
      </div>
    </div>
  );
}
