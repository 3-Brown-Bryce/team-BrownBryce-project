import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import "./awards.css";

function Awards({ setPage, name }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setLoggedIn(!!user);
      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const q = query(collection(db, "awards"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        rows.sort((a, b) => {
          const ta = a.earnedAt?.toMillis?.() ?? 0;
          const tb = b.earnedAt?.toMillis?.() ?? 0;
          return tb - ta;
        });
        setItems(rows);
      } catch (e) {
        console.error("Error adding document", e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  function formatEarned(ts) {
    if (!ts?.toDate) return "";
    return ts.toDate().toLocaleString();
  }

  return (
    <div className="awards-page">
      <h1 className="awards-title">Awards</h1>
      <p className="awards-sub">
        {name}, day 1 through day 30 on your streak (from the daily log).
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : !loggedIn ? (
        <p>Sign in with Google to see your awards.</p>
      ) : items.length === 0 ? (
        <p>No awards yet. Go to Daily Log, journal, then claim reward.</p>
      ) : (
        <div className="awards-grid">
          {items.map((a) => (
            <div key={a.id} className="award-badge">
              <img src={a.imageUrl} className="award-badge-img" />
              <p className="award-badge-details">{a.details}</p>
              <p className="award-badge-meta">{formatEarned(a.earnedAt)}</p>
            </div>
          ))}
        </div>
      )}

      <button type="button" className="small-btn awards-back" onClick={() => setPage("home")}>
        Back to home
      </button>
    </div>
  );
}

export default Awards;
