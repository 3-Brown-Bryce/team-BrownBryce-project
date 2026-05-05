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

      <GoogleLogin onSignedIn={() => setPage("App")}/>

      <button onClick={() => setPage("App")}>
        Guest Login
      </button>
    </div>
  )
}

export default LoginPage;


