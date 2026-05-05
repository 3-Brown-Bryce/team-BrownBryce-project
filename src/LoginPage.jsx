import GoogleLogin from "./GoogleLogin";
import App from "./App.jsx";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./LoginPage.css"

// Move the state inside the component function
function LoginPage() {
  const [page, setPage] = useState("home"); 

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPage("App");
      }
    });
    return () => unsub();
  }, []);


  if (page === "App") {
    return <App setPage={setPage} />;
  }

  return (
    <div className="login-page">
      <div className = "Congradulations">
      <h1>Congradulations!</h1>
      <p>You’ve just made a huge step on your journey of quitting your addiction</p>
      <GoogleLogin onSignedIn={() => setPage("App")}/>
      <button onClick={() => setPage("App")}>
        Guest Login
      </button>
    </div>

  )
}


export default LoginPage;