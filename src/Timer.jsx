function Timer(){
  const CountdownTimer = ({ initialSeconds }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
  
    useEffect(() => {
      // Exit early when timer reaches 0
      if (seconds <= 0) return;
  
      // Save intervalId to clear the interval when the component unmounts
      const intervalId = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
  
      // The cleanup function is crucial to avoid memory leaks
      return () => clearInterval(intervalId);
    }, [seconds]);
  
    return (
      <div>
        <h1>Time Left: {seconds}s</h1>
        <button type="button" className="small-btn" onClick={() => setPage("home")}>
        Back to Home
      </button>
      </div>
    );
  };
}

export default Timer