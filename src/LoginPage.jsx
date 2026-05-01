import GoogleLogin from "./GoogleLogin";
import App from "./App.jsx";
import { useState } from "react";

// Move the state inside the component function
function LoginPage(){
  const [page, setPage] = useState("home"); 

  if (page === "App") {
    return <App setPage={setPage} />;
  }

  return (
    <div>
      <h1>Welcome!</h1>

      <GoogleLogin />

      <button onClick={() => setPage("home")}>
        Guest Login
      </button>
    </div>
  )
}

export default LoginPage;


