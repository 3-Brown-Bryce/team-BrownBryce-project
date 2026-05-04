import heroImg from './assets/hero.png';
import { useEffect, useState } from "react";
import "./App.css";
import Nav from './Nav.jsx';
import DailyLog from './Log.jsx';
import Calendar from './Calendar.jsx';
import Motivation from './Motivation.jsx';  
import Reasons from './Reasons.jsx';         

function App() {
  const [name, setName] = useState("Name");
  const [daysClean, setDaysClean] = useState(0);
  const [time, setTime] = useState(new Date());
  const [page, setPage] = useState("home");

  // clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // page switch
  if (page === "log") {
    return <DailyLog setPage={setPage} />;
  }

  if (page === "LoginPage") {
    return <LoginPage setPage={setPage} />;
  }

  if (page === "calendar") {
    return <Calendar setPage={setPage} />;
  }

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6; 
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="container">

      <div className="header">Addiction Management</div>

      <div className="main">
        <div className="left">Days</div>

        <div className="clock-container">
          <div className="clock">
            <div className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }} />
            <div className="hand minute" style={{ transform: `rotate(${minuteDeg}deg)` }} />
            <div className="hand second" style={{ transform: `rotate(${secondDeg}deg)` }} />
          </div>

          <div className="days-number">{daysClean}</div>
          <div className="message">Good job {name}!</div>
        </div>

        <div className="right">
          <div>Clean</div>

          <button
            className="small-btn"
            onClick={() => setPage("calendar")}
          >
            Check calendar
          </button>
        </div>
      </div>

      <div className="bottom">
        <button className="big-btn">Motivation</button>

        <button onClick={() => setPage("LoginPage")}>
          Logout
        </button>

        <button onClick={() => setPage("log")}>
          Daily Log
        </button>

        <button className="big-btn">Reason</button>
      </div>
    </div>
  );
}

export default App;
