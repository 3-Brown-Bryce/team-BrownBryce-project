import { useState } from "react";
import { db } from "./firebase";
import { collection,addDoc } from "firebase/firestore"

function AddictionSelection(){

    const [text,setText] = useState("");

    const handleSave = async() => {
        try{
            await addDoc(collection(db,"Addiction")),{
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
            <section>
                <p>please select an addiction:</p>
                <button>scrolling</button>
                <button>video games</button>
                <button>procrastination</button>
                <button>fast foods</button>
                <button>sugar</button>
                <button>caffiene</button>
                <button>skin picking</button>
            </section>
            <section>
                <p>Do you have an addiction that wasn't listed? please enter it here:</p>
                <input 
                value={text}
                onChange={(e)=> setText(e.target.value)}
                placeholder = "Input a reason"></input>
                <button onClick = {handleSave}>enter</button>
            </section>
        </div>
    )
}
export default AddictionSelection