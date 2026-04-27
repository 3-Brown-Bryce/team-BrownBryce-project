import AddictionSelection from "./AddictionSelection"
import ReasonSelection from "./ReasonSelection"

function Reasons(){
    return(
        <div>
            <h3>Personalize</h3>
            <p>Answer these quick questions to personalize your experience</p>
            <AddictionSelection />
            <ReasonSelection />
        </div>
    )
}

export default Reasons;
