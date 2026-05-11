import GoogleLogin from "./GoogleLogin";
import { useState } from "react";

function LoginPage({ setPage, name }) {
    if (page === "home") {
    return <App />;
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
    </div>
    )
}


export default LoginPage;