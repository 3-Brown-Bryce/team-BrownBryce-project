import { useState,useEffect } from 'react';
import './Calendar.css';
import { auth,db } from './firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";


export default function Calendar({ setPage }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3));
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

  useEffect(() => {
    const fetchSavedRange = async () => {
      const user = auth.currentUser;
      if (!user) return;
  
      try {
        const docRef = doc(db, "dateRanges", user.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          const start = data.startDate.toDate();
          const end = data.endDate.toDate();
          setCurrentDate(new Date(start.getFullYear(), start.getMonth()));
          setStartDate(start.getDate());
          setEndDate(end.getDate());
        }
      } catch (error) {
        console.error("Error fetching range:", error);
      }
    };
  
    fetchSavedRange();
  }, []);

  const handleDateClick = (day) => {
    if (!day) return;
    
    
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (day < startDate) {
      setStartDate(day);
    } else if (day > startDate) {
      setEndDate(day);
    }
  };

  const changeMonth = (dir) => {
    setCurrentDate(new Date(year, month + dir));
    setStartDate(null);
    setEndDate(null);
  };

  const saveRange = async () => {
    const user = auth.currentUser;
  
    if (!user) {
      alert("Please log in first!");
      return;
    }
  
    try {
      const start = new Date(year, month, startDate);
      const end = new Date(year, month, endDate);
  
      // Use setDoc to create/overwrite a document named exactly after the UID
      await setDoc(doc(db, "dateRanges", user.uid), {
        uid: user.uid,
        startDate: start,
        endDate: end,
        updatedAt: serverTimestamp(), // Changed to 'updatedAt' for clarity
      });
  
      alert("Your date range has been updated!");
    } catch (error) {
      console.error("Error saving range:", error);
      alert("Failed to update range.");
    }
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

        <button className="big-btn" onClick={saveRange}>
          Confirm Range
        </button>
        
        <button className="small-btn" onClick={() => setPage('home')}>Back</button>
      </div>
      
    </div>
  );
}
