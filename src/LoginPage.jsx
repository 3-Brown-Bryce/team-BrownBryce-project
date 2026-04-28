import GoogleLogin from "./GoogleLogin"
import App from './App.jsx'
import { useEffect, useState } from "react";
import "./LoginPage.css"

// Move the state inside the component function
function LoginPage(){
  const [page, setPage] = useState("home"); 

  if (page === "App") {
    return <App setPage={setPage} />;
  }

  return(
    <div>
      <h1 className = "Sign_Up">Sign Up!</h1>
      <div className = "Congradulations">
      <h1>Congradulations!</h1>
      <p>You’ve just made a huge step on your journey of quitting your addiction</p>
      </div>
      <GoogleLogin />
      <button onClick={() => setPage("App")}>
        Guest Login
      </button>
    </div>



  )
}


export default LoginPage;