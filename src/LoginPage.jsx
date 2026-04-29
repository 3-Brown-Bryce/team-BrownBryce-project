import GoogleLogin from "./GoogleLogin"
import App from './App.jsx'
import { useEffect, useState } from "react";

<<<<<<< Updated upstream
// Move the state inside the component function
function LoginPage(){
  const [page, setPage] = useState("home"); 

  if (page === "App") {
    return <App setPage={setPage} />;
  }

  return(
    <div>
      <h1>Welcome!</h1>
      <GoogleLogin />
      <button onClick={() => setPage("App")}>
        Guest Login
      </button>
    </div>
  )
=======
function LoginPage({ setPage, name }) {
    return(
        <div>
            <h1>Welcome!</h1>
            <GoogleLogin />

             <button onClick={() => setPage("home")}>
             Back
         </button>
     </div>
  );
>>>>>>> Stashed changes
}


export default LoginPage;


