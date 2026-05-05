import { useEffect, useState, useCallback } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc, arrayUnion, collection, addDoc, serverTimestamp, } from "firebase/firestore";
import { formatLocalDate } from "./streakUtils";
import { getDayAward, MAX_AWARD_DAY } from "./awardDefinitions";

function ClaimReward({ refreshKey = 0 }) {
  const [loading, setLoading] = useState(true);
  const [canClaim, setCanClaim] = useState(false);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState("");
  const [claiming, setClaiming] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      setCanClaim(false);
      setStreak(0);
      setMessage("Sign in with Google to claim an award.");
      setLoading(false);
      return;
    }

    const snap = await getDoc(doc(db, "users", user.uid));
    if (!snap.exists) {
      setCanClaim(false);
      setStreak(0);
      setMessage("Log in first, then save today's journal.");
      setLoading(false);
      return;
    }

    const data = snap.data();
    const today = formatLocalDate(new Date());
    const last = data.lastJournalDate;
    const s = typeof data.journalStreak === "number" ? data.journalStreak : 0;
    const claimed = Array.isArray(data.awards) ? data.awards : [];
    const awardId = `day-${s}`;
    const journaledToday = last === today;
    const inRange = s >= 1 && s <= MAX_AWARD_DAY;
    const notClaimed = !claimed.includes(awardId);

    setStreak(s);

    if (!journaledToday) {
      setCanClaim(false);
      setMessage("Save your journal for today first, then you can claim.");
    } else if (s > MAX_AWARD_DAY) {
      setCanClaim(false);
      setMessage(`Streak is past day ${MAX_AWARD_DAY} — awards only go up to day ${MAX_AWARD_DAY}.`);
    } else if (!inRange) {
      setCanClaim(false);
      setMessage("Journal to start your streak.");
    } else if (!notClaimed) {
      setCanClaim(false);
      setMessage(`You already claimed ${getDayAward(s)?.title ?? "this"} award.`);
    } else {
      setCanClaim(true);
      setMessage(`You can claim: ${getDayAward(s)?.title ?? "streak award"}.`);
    }

    setLoading(false);
  }, [refreshKey]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleClaim = async () => {
    const user = auth.currentUser;
    if (!user || !canClaim) return;

    const def = getDayAward(streak);
    if (!def) return;

    setClaiming(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          awards: arrayUnion(def.id),
        },
        { merge: true }
      );

      await addDoc(collection(db, "awards"), {
        userId: user.uid,
        awardId: def.id,
        title: def.title,
        details: def.details,
        imageUrl: def.imageUrl,
        earnedAt: serverTimestamp(),
      });

      alert(`You claimed: ${def.title}!`);
      await refresh();
    } catch (e) {
      console.error("Error adding document", e);
      alert("Could not save. Try again.");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="claim-reward">
      <p className="claim-reward-title">claim reward</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="claim-reward-msg">{message}</p>
          <button
            type="button"
            className="small-btn"
            disabled={!canClaim || claiming}
            onClick={handleClaim}
          >
            {claiming ? "Saving..." : "claim reward"}
          </button>
        </>
      )}
    </div>
  );
}

export default ClaimReward;
