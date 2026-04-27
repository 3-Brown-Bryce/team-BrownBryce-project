
import "./Motivation.css";


function Motivation({ setPage, name }) {
  return (
    <div className="motivation-page">
      
      <div className="header">
        <h1>Motivation</h1>
      </div>


      <h2 className="subtitle">You're doing great {name}!</h2>


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


    </div>
  );
}


export default Motivation;

