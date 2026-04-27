import AddictionSelection from "./AddictionSelection"
import ReasonSelection from "./ReasonSelection"

function Reasons({ setPage, name }) {
    return(
        <div>
            <h3>Personalize</h3>
            <p>Answer these quick questions to personalize your experience</p>
            <AddictionSelection />
            <ReasonSelection />

            <button onClick={() => setPage("home")}>
            Back
          </button>
    </div>
  );
}

export default Reasons;
