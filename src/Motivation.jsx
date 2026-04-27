function Motivation({ setPage, name }) {
  return (
    <div>
      <h2>You're doing great {name}!</h2>
      <p>You got some rewards</p>

      <button>view rewards</button>

      <button onClick={() => setPage("home")}>
        Back
      </button>
    </div>
  );
}

export default Motivation;
