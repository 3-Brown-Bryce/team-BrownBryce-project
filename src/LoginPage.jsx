import GoogleLogin from "./GoogleLogin";
import App from "./App.jsx";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

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
    <div>
      <h1>Welcome!</h1>

      <GoogleLogin onSignedIn={() => setPage("App")}/>

      <button onClick={() => setPage("App")}>
        Guest Login
      </button>
    </div>
  )
}

export default LoginPage;


