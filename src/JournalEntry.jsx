import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { formatLocalDate, addDays } from "./streakUtils";

function Journal({ onJournalSaved }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = async () => {
    const text = inputValue.trim();
    if (!text) {
      alert("Write something in your journal first.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Sign in with Google to save your streak.");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    const data = snap.exists ? snap.data() : {};
    const last = data.lastJournalDate;
    const current = typeof data.journalStreak === "number" ? data.journalStreak : 0;

    const todayStr = formatLocalDate(new Date());
    const yesterdayStr = formatLocalDate(addDays(new Date(), -1));

    if (last === todayStr) {
      alert("You already journaled today. Come back tomorrow!");
      return;
    }

    let next;
    if (!last) {
      next = 1;
    } else if (last === yesterdayStr) {
      next = current + 1;
    } else {
      next = 1;
    }

    try {
      await setDoc(
        userRef,
        {
          journalStreak: next,
          lastJournalDate: todayStr,
        },
        { merge: true }
      );
      alert(`Journal saved! Your streak is ${next} days`);
      setInputValue("");
      onJournalSaved?.({ streak: next });
    } catch (e) {
      console.error(e);
      alert("Could not save. Try again.");
    }
  };

  return (
    <div>
      <p>Journal entry</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="I'm quitting because..."
      />
      <button type="button" onClick={handleSave}>
        Save input
      </button>
      <p>{inputValue}</p>
    </div>
  );
}

export default Journal;
