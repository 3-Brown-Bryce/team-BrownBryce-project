import Journal from './JournalEntry.jsx'
import Upload from './ImageUpload.jsx'
import ClaimReward from './Reward.jsx';
import { useEffect, useState } from "react";
import App from './App.jsx';

function DailyLog(){
      const [page, setPage] = useState("Log");
    if (page === "Home") {
    return <Log setPage={Home} />;
  }
    return(
        <div>
            <Upload />
            <Journal />
            <ClaimReward />
            <button 
            className="small-btn"
            onClick={() => setPage("App")}
          >
            Check calendar
          </button>
             <button onClick={() => setPage("Home")}>
            Back to Home
            </button>
        </div>
    )
}

export default DailyLog;
