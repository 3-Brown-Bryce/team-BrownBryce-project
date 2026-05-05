import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

function ReasonSelection({ initialQuitReason = "", onQuitReasonSaved }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(initialQuitReason);
  }, [initialQuitReason]);

  const handleSave = async () => {
    try {
      const value = text.trim();
      if (!value) {
        alert("Write your reason first.");
        return;
      }
      const user = auth.currentUser;
      if (!user) {
        alert("You are not logged in, could not save.");
        return;
      }
      await setDoc(doc(db, "users", user.uid), { quitReason: value }, { merge: true });
      onQuitReasonSaved?.(value);
      alert("Saved!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Why do you want to quit this addiction?</h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Input a reason"
      />
      <button type="button" onClick={handleSave}>
        save
      </button>
    </div>
  );
}
export default ReasonSelection;
