import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { useEffect, useState } from "react";
import "./App.css";
import Nav from './Nav'
import Welcome from './Welcome'
import Reason from './Reason'
import Log from './Log'

function App() {

  const [name, setName] = useState("Name");

  
  const [daysClean, setDaysClean] = useState(12);

  
  const [time, setTime] = useState(new Date());

  const [page, setPage] = useState("home");
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
  
    <div className="container">
      <Nav setPage = {setPage} />
      {page === "Welcome" && <Welcome />}
      {page === "Reason" && <Reason />}
      {page === "Log" && <Log />}
      <div className="header">Addiction Management</div>

      <div className="main">
        <div className="left">Days</div>

        <div className="clock-container">
          <div className="clock">
            <div
              className="hand hour"
              style={{ transform: `rotate(${hourDeg}deg)` }}
            />
            <div
              className="hand minute"
              style={{ transform: `rotate(${minuteDeg}deg)` }}
            />
            <div
              className="hand second"
              style={{ transform: `rotate(${secondDeg}deg)` }}
            />
          </div>

          <div className="days-number">{daysClean}</div>
          <div className="message">Good job {name}!</div>
        </div>

        <div className="right">
          <div>Clean</div>
          <button className="small-btn">Check calendar</button>
        </div>
      </div>

      <div className="bottom">
        <button className="big-btn">Motivation</button>
        <button className="logout">Log out</button>
        <button className="big-btn">Reason</button>
      </div>
    </div>
  );
}

export default App;
