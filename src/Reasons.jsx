import AddictionSelection from "./AddictionSelection";
import ReasonSelection from "./ReasonSelection";

function Reasons({ setPage }) {
  return (
    <div>
      <AddictionSelection />
      <ReasonSelection />

      <button onClick={() => setPage("home")}>
        Back
      </button>
    </div>
  );
}

export default Reasons;
