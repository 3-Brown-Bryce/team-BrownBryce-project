import { useState } from "react"

function Journal(){
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) =>{
        setInputValue(event.target.value);
    };

    const handleSave = () => {
        console.log("Input saved:", inputValue);
        alert(`You saved: ${inputValue}`);
    }

    return(
        <div>
            <p>Journal entry</p>
            <input 
            type = "text" 
            value ={inputValue}
            onChange = {handleChange}
            placeholder = "I'm quitting because..."></input>
            <button onClick={handleSave}>Save input</button>
            <p>{inputValue}</p>
        </div>
    )
}



export default Journal