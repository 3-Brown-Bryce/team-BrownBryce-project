import { useState } from "react";
import "./Motivation.css";

// Would like feature: Make a JSON or CSV file for these that is called, keep it seperate from the code itself
const quotes = [
  "You're doing great [name]!",
  "Keep reaching for the stars [name]!",
  "Your addiction does not define you [name]!",
  "Recovery takes time [name]!"
];

function Motivation({ setPage, name = "friend" }) {
  const [quote, setQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div className="motivation-page">

      <div className="header">
        <h1>Motivation</h1>
      </div>

      <h2 className="subtitle">
        {quote.replaceAll("[name]", name)}
      </h2>

      <button onClick={generateQuote}>
        Generate new quote
      </button>

      <p>You got some rewards</p>

      <button type="button" onClick={() => setPage("awards")}>
        View rewards
      </button>

      <div className="content">

        <div className="reward-card">
          <h3>You got some awards!</h3>
          <button type="button" className="view-btn" onClick={() => setPage("awards")}>
            View awards
          </button>
        </div>

        <div className="side-buttons">
          <button type="button" className="calendar-btn" onClick={() => setPage("calendar")}>
            Check calendar
          </button>

          <button
            className="back-btn"
            onClick={() => setPage("home")}
          >
            Back to home
          </button>
        </div>

      </div>
    </div>
  );
}

export default Motivation;


