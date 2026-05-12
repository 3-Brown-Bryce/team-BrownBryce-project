import AddictionSelection from "./AddictionSelection"
import ReasonSelection from "./ReasonSelection"
import App from "./App"
import "./Reason.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { streakIsActive } from "./streakUtils";

function Reasons(){
  const [currentAddiction, setCurrentAddiction] = useState(" Enter Addiction Here");
  const [currentQuitReason, setCurrentQuitReason] = useState(" Enter Quit Reason Here");
  const [page, setPage] = useState("home");
    if (page === "App") {
        return <App setPage={setPage} />;
      }
  return (
    <div className='banana'>
      <h3>Personalize</h3>
      <p>
        Answer these quick questions to personalize your experience.
      </p>
      <AddictionSelection
        initialAddiction={currentAddiction}
        onAddictionSaved={setCurrentAddiction}
      />
      <strong>Your addiction:</strong>{currentAddiction}
      <p>
        {currentQuitReason ? currentQuitReason : "(not set yet)"}
      </p>
      <ReasonSelection
        initialQuitReason={currentQuitReason}
        onQuitReasonSaved={setCurrentQuitReason}
      />
        <strong>Your reason to quit:</strong>{currentQuitReason}

        <button onClick={() => setPage("App")} className="big-btn">
          Go back home
        </button>
        </div>
    )
}

export default Reasons;