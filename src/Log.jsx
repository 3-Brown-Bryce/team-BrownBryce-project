import { useState } from "react";
import "./log.css";
import Journal from "./JournalEntry.jsx";
import ClaimReward from "./Reward.jsx";

function DailyLog({ setPage }) {
  const [rewardRefresh, setRewardRefresh] = useState(0);

  return (
    <div className="log-page">
      <h1 className="title">Daily Log</h1>

      <div className="log-card">
        <div className="left">
          <Journal onJournalSaved={() => setRewardRefresh((k) => k + 1)} />
        </div>

        <div className="right">
          <ClaimReward refreshKey={rewardRefresh} />
        </div>
      </div>

      <button type="button" className="small-btn" onClick={() => setPage("awards")}>
        View all awards
      </button>

      <button type="button" className="small-btn" onClick={() => setPage("home")}>
        Back to Home
      </button>
    </div>
  );
}

export default DailyLog;
