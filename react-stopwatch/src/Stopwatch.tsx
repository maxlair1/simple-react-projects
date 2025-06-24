import {useState, useEffect} from "react"


const Stopwatch = () => {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(()=> {
        let intervalId: number

        if (isRunning) { 
            intervalId = setInterval(() => (setTime(time+1), 10)); //1 milisecond 
        }
        return () => clearInterval(intervalId)
    },[isRunning, time])

    //format time
    const hours = Math.floor(time / 360000)
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    //start and stop the timer
    function startStopTimer() {
        setIsRunning(!isRunning)
    }

    //clear/reset time
    function resetTime() {
        setIsRunning(false)
        setTime(0)
    }

    return (
        <>
            <div className="flex justify-center align-middle w-screen h-screen mx-auto">
                <div className="flex flex-col w-full align-middle self-center items-center justify-middle">
                    {/* <span>{hours}:{minutes}:{seconds}{time}</span> */}
                    <span className="text-[50px]">
                        {hours}:{minutes.toString().padStart(2, "0")}:
                        {seconds.toString().padStart(2, "0")}:
                        {milliseconds.toString().padStart(2, "0")}
                    </span>
                    <button onClick={startStopTimer}>Start / Pause Timer</button>
                    <button onClick={resetTime}>Reset</button>
                </div>
            </div>
        </>
    )
}

export default Stopwatch