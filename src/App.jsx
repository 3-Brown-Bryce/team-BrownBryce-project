import heroImg from './assets/hero.png';
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { streakIsActive } from "./streakUtils";
import "./App.css";
import Nav from './Nav.jsx';
import DailyLog from './Log.jsx';
import Calendar from './Calendar.jsx';
import Motivation from './Motivation.jsx';
import Reasons from './Reasons.jsx';
import Awards from './Awards.jsx';
import LoginPage from './LoginPage.jsx';
import Timer from './Timer.jsx';

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

  async function loadStreak() {
    const user = auth.currentUser;
    if (!user) {
      setDaysClean(0);
      return;
    }
    const snap = await getDoc(doc(db, "users", user.uid));
    if (!snap.exists) {
      setDaysClean(0);
      return;
    }
    const data = snap.data();
    const stored = typeof data.journalStreak === "number" ? data.journalStreak : 0;
    const last = data.lastJournalDate;
    setDaysClean(streakIsActive(last) ? stored : 0);
  }

  // greeting + streak from Firestore
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user?.displayName) {
        setName(user.displayName);
      } else if (user?.email) {
        setName(user.email.split("@")[0]);
      } else {
        setName("Name");
      }
      await loadStreak();
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (page !== "home") return;
    loadStreak();
  }, [page]);

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

  if (page === "reason") {
    return <Reasons setPage={setPage} name={name} />;
  }

  if (page === "motivation") {
    return <Motivation setPage={setPage} name={name} />;
  }

  if (page === "awards") {
    return <Awards setPage={setPage} name={name} />;
  }

  if (page === "timer") {
    return <Timer setpage={setPage} name = {name} />;
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

          <div className="days-number">You are {daysClean} days clean!</div>
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
        <button onClick={() => setPage("motivation")} className="big-btn">
          Motivation
        </button>

        <button
          onClick={async () => {
            await signOut(auth);
            setPage("LoginPage");
          }}
        >
          Logout
        </button>

        <button onClick={() => setPage("log")}>
          Daily Log
        </button>

        <button onClick={() => setPage("awards")} className="big-btn">
          Awards
        </button>

        <button onClick={() => setPage("reason")} className="big-btn">
          Reason
        </button>

        <button onClick={() => setPage("timer")} className = "big-btn">
          Optional timer
        </button>

      </div>
    </div>
  );
}

export default App;
