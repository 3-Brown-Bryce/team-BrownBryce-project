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
  const [currentAddiction, setCurrentAddiction] = useState("");
  const [currentQuitReason, setCurrentQuitReason] = useState("");
  const [page, setPage] = useState("home");
    if (page === "App") {
        return <App setPage={setPage} />;
      }

      useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentAddiction("");
        setCurrentQuitReason("");
        return;
      }
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists) {
        const data = snap.data();
        setCurrentAddiction(typeof data.addiction === "string" ? data.addiction : "");
        const q =
          typeof data.quitReason === "string"
            ? data.quitReason
            : typeof data.reason === "string"
              ? data.reason
              : "";
        setCurrentQuitReason(q);
      } else {
        setCurrentAddiction("");
        setCurrentQuitReason("");
      }
    });
    return () => unsub();
  }, []);

    
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