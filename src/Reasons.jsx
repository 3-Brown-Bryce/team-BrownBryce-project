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
  const [currentAddiction, setCurrentAddiction] = useState("Scrolling");
  const [currentQuitReason, setCurrentQuitReason] = useState("not set yet");
  const [page, setPage] = useState("home");
    if (page === "App") {
        return <App setPage={setPage} />;
      }
  return (
    <div className='banana'>
      <h3>Personalize</h3>
      <p>
        {name}, answer these quick questions to personalize your experience.
      </p>
      <AddictionSelection
        initialAddiction={currentAddiction}
        onAddictionSaved={setCurrentAddiction}
      />
      <p>
        <strong>Your reason to quit:</strong>{" "}
        {currentQuitReason ? currentQuitReason : "(not set yet)"}
      </p>
      <ReasonSelection
        initialQuitReason={currentQuitReason}
        onQuitReasonSaved={setCurrentQuitReason}
      />
        </div>
    )
}

export default Reasons;