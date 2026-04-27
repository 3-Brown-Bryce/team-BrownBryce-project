import "./LoginPage.css";
import GoogleLogin from "./GoogleLogin";


function LoginPage({ setPage }) {
  return (
    <div className="login-container">
      <div className="login-card">


        <div className="header">
          <h1>Sign Up</h1>
        </div>


        <div className="content">


          {/* LEFT SIDE TEXT */}
          <div className="text-section">
            <h2>Congratulations</h2>
            <p>
              You've just made a huge step on your journey of quitting your addiction
            </p>
          </div>


          {/* RIGHT SIDE BUTTONS */}
          <div className="button-section">
            <button
              className="primary-btn"
              onClick={() => setPage("home")}
            >
              Get Started
            </button>


            <button
              className="secondary-btn"
              onClick={() => setPage("login")}
            >
              Login
            </button>
          </div>


        </div>


        {/* Optional Google Login */}
        <div className="google-login">
          <GoogleLogin />
        </div>


      </div>
    </div>
  );
}


export default LoginPage;


