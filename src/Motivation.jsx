
import { useState } from "react"
import "./Motivation.css";

const Quotes = [
    "You're doing great [Name]!",
    "Keep reaching for the stars [Name]!",
    "Your [AddictionSelected] does not define you [Name]!",
    "Recovery takes time [Name]!"
];

function Motivation({ setPage, name }) {
  
    const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

    const generateQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    }

   return (
    <div className="motivation-page">
      
      <div className="header">
        <h1>Motivation</h1>
      </div>

      <h2 className="subtitle">{quote}</h2>
            <button onClick={generateQuote}>Generate new quote</button>
            <p>You got some rewards</p>
            <button>view rewards</button>


      <div className="content">
        
        <div className="reward-card">
          <h3>You got some awards!</h3>
          <button className="view-btn">View awards</button>
        </div>


        <div className="side-buttons">
          <button className="calendar-btn">Check calendar</button>
          <button 
            className="back-btn"
            onClick={() => setPage("home")}
          >
            Back to home
          </button>

        </div>


      </div>
  );
}


export default Motivation;

