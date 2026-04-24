
import "./log.css";
import Journal from './JournalEntry.jsx';
import Upload from './ImageUpload.jsx';
import ClaimReward from './Reward.jsx';

function DailyLog({ setPage }) {
  return (
    <div>
      <Upload />
      <Journal />
      <ClaimReward />

      <button
        className="small-btn"
        onClick={() => setPage("home")}
      >
        Check calendar
      </button>

      <button onClick={() => setPage("home")}>
        Back to Main
      </button>
    </div>
  );
}

export default DailyLog;

