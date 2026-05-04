
import { useState } from "react";
import { db } from "./firebase";
import { collection,addDoc } from "firebase/firestore"

function ReasonSelection(){

    const [text,setText] = useState("");

    const handleSave = async() => {
        try{
            await addDoc(collection(db,"Reason")),{
                content: text
            };
            setText("");
            alert("Saved!");
        } catch(e){
            console.error("Error adding document", e);
        }
    };

    return(
        <div>
            <h3>Why do you want to quit this addiction?</h3>
            <input
                value={text}
                onChange={(e)=> setText(e.target.value)}
                placeholder = "Input a reason"></input>
            <button onClick = {handleSave}>enter</button>
        </div>
    )
}
export default ReasonSelection