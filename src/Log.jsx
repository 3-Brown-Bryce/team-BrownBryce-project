
import "./log.css";
import Journal from './JournalEntry.jsx';
import Upload from './ImageUpload.jsx';
import ClaimReward from './Reward.jsx';

function DailyLog({ setPage }) {
  return (
    <div className="log-page">
      <h1 className="title">Daily Log</h1>

      <div className="log-card">
        <div className="left">
          <Journal />
        </div>

        <div className="right">
          <Upload />
          <Upload />
          <ClaimReward />
        </div>
      </div>

      <button
        className="small-btn"
        onClick={() => setPage("home")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default DailyLog;
