
// import "./Nav.css"
function Nav({ setPage }) {
    return (
        <div className="nav">
        <ul>
            <li onClick={() => setPage("Welcome")}>Welcome</li>
            <li onClick={() => setPage("Reason")}>Reason</li>
            <li onClick={() => setPage("Log")}>Log</li>
        </ul>
        </div>
    )
}

export default Nav;