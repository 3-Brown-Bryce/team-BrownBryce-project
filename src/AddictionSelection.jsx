import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function AddictionSelection(){

    const [text, setText] = useState("");

    const handleSave = async() => {
        try {
            const user = auth.currentuser;
            if (!user) {
                alert("You are not logged in, could not save.");
                return;
            }
            await setDoc(doc(db, "users", user.uid), { addiction: text }, { merge: true });
            setText("");
            alert("Saved!");
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <section>
                <p>please select an addiction:</p>
                <button onClick={ text = "scrolling" }>scrolling</button>
                <button>video games</button>
                <button>procrastination</button>
                <button>fast foods</button>
                <button>sugar</button>
                <button>caffeine</button>
                <button>skin picking</button>
            </section>
            <section>
                <p>Do you have an addiction that wasn't listed? please enter it here:</p>
                <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder = "Input a reason"></input>
                <button onClick = {handleSave}>enter</button>
            </section>
        </div>
    )
}
export default AddictionSelection;