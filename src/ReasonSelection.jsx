
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function ReasonSelection(initialReason = "", onReasonSaved){

     const [text, setText] = useState("");
    
        useEffect(() => {
            setText(initialReason);
        }, [initialReason]);
    
        const handleSave = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    alert("You are not logged in, could not save.");
                    return;
                }
                await setDoc(doc(db, "users", user.uid), { reason: text }, { merge: true });
                onReasonSaved?.(value);
                alert("Saved!");
            } catch (error) {
                console.error(error);
            }
        };

    return(
        <div>
            <h3>Why do you want to quit this addiction?</h3>
            <input
                value={text}
                onChange={(e)=> setText(e.target.value)}
                placeholder = "Input a reason"></input>
            <button onClick = {handleSave}>save</button>
        </div>
    )
}
export default ReasonSelection