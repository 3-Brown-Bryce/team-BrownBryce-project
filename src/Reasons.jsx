import AddictionSelection from "./AddictionSelection";
import ReasonSelection from "./ReasonSelection";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

function Reasons({ setPage }) {
  const [currentAddiction, setCurrentAddiction] = useState("");
  const [currentQuitReason, setCurrentQuitReason] = useState("");

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
    <div>
      <h3>Personalize</h3>
      <p>Answer these quick questions to personalize your experience</p>
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

      <button onClick={() => setPage("home")}>Back</button>
    </div>
  );
}

export default Reasons;
