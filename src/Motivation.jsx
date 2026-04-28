import { useState } from "react"

const Quotes = [
    "You're doing great [Name]!",
    "Keep reaching for the stars [Name]!",
    "Your [AddictionSelected] does not define you [Name]!",
    "Recovery takes time [Name]!"
];
function Motivation(){

    const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

    const generateQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    }
    return(
        <div>
            <h2>{quote}</h2>
            <button onClick={generateQuote}>Generate new quote</button>
            <p>You got some rewards</p>
            <button>view rewards</button>
        </div>
    )
}

export default Motivation
