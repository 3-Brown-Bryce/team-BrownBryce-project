import AddictionSelection from "./AddictionSelection"
import ReasonSelection from "./ReasonSelection"
import App from "./App"
import "./Reason.css";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

function Reasons(){
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
        <div>
            <AddictionSelection />
            <ReasonSelection />
        <button onClick={() => setPage("App")} className="big-btn">
          Go back home
        </button>
        </div>
    )
}

export default Reasons;