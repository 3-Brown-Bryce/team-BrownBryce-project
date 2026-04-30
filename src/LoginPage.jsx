import GoogleLogin from "./GoogleLogin";
import { useState } from "react";

function LoginPage({ setPage, name }) {
    if (page === "home") {
    return <App />;
  }

  return (
    <div>
      <h1>Welcome!</h1>

      <GoogleLogin />

      <button onClick={() => setPage("home")}>
        Guest Login
      </button>
    </div>
  );
}

export default LoginPage;


