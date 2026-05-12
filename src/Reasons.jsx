import AddictionSelection from "./AddictionSelection"
import ReasonSelection from "./ReasonSelection"
import App from "./App"
import { useState } from "react";

function Reasons(){
    const [page, setPage] = useState("home");
    if (page === "App") {
        return <App setPage={setPage} />;
      }

    return(
        <div>
            <AddictionSelection />
            <ReasonSelection />
        <button onClick={() => setPage("App")} className="big-btn">
          Go back home
        </button>
        </div>
    )
}

export default Reasons;