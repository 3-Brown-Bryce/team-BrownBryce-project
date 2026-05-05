import AddictionSelection from "./AddictionSelection"
import ReasonSelection from "./ReasonSelection"
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

function Reasons({ setPage, name }) {

  const [currentAddiction, setCurrentAddiction] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentAddiction("");
        return
      }
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists) {
        const data = snap.data()
        setCurrentAddiction(typeof data.addiction === "string" ? data.addiction : "");
      } else {
        setCurrentAddiction("");
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentReason("");
        return
      }
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists) {
        const data = snap.data()
        setCurrentAddiction(typeof data.reason === "string" ? data.reason : "");
      } else {
        setCurrentReason("");
      }
    });
    return () => unsub();
  }, []);

    return(
        <div>
            <h3>Personalize</h3>
            <p>Answer these quick questions to personalize your experience</p>
            <AddictionSelection initialAddiction={currentAddiction} onAddictionSaved={setCurrentAddiction}/>
            <ReasonSelection />

            <button onClick={() => setPage("home")}>
            Back
          </button>
    </div>
  );
}

export default Reasons;

