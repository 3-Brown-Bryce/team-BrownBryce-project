function Timer(){
    const CountdownTimer = ({ targetDate }) => {
        const calculateTimeLeft = () => {
          const difference = +new Date(targetDate) - +new Date();
          let timeLeft = {};
      
          if (difference > 0) {
            timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
            };
          }
          return timeLeft;
        };
      
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
      
        useEffect(() => {
          const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
          }, 1000);
      
          // CRITICAL: Cleanup interval on unmount
          return () => clearInterval(timer);
        }, [targetDate]);
      
        return (
          <div>
            {timeLeft.days || timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
              <p>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </p>
            ) : (
              <span>Time's up!</span>
            )}

            <button type="button" className="small-btn" onClick={() => setPage("home")}>
              Back to Home
            </button>
          </div>
        );
      };
}

export default Timer