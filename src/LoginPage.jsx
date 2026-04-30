import GoogleLogin from "./GoogleLogin";

function LoginPage({ setPage, name }) {
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


