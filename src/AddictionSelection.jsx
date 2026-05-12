import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

function AddictionSelection({ initialAddiction = "", onAddictionSaved }){
    const [text, setText] = useState("");

    useEffect(() => {
        setText(initialAddiction);
    }, [initialAddiction]);

    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                alert("You are not logged in, could not save.");
                return;
            }
            const value = text.trim();
            await setDoc(doc(db, "users", user.uid), { addiction: value }, { merge: true });
            onAddictionSaved?.(value);
            alert("Saved!");
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <section>
                <p>please select an addiction:</p>
                <button onClick={() => setText("scrolling")}>scrolling</button>
                <button onClick={() => setText("video games")}>video games</button>
                <button onClick={() => setText("procrastination")}>procrastination</button>
                <button onClick={() => setText("fast foods")}>fast foods</button>
                <button onClick={() => setText("sugar")}>sugar</button>
                {/* Sugar & Fast Food both seem the same */}
                <button onClick={() => setText("caffeine")}>caffeine</button>
                <button onClick={() => setText("skin picking")}>skin picking</button>
            </section>
            <section>
                <p>Do you have an addiction that wasn't listed? please enter it here:</p>
                <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder = "Input an addiction"></input>
                <button onClick = {handleSave}>save</button>
            </section>
        </div>
    )
}
export default AddictionSelection;