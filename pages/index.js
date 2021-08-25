import React, { useState, useEffect } from "react";
import { HiTicket, HiArrowDown, HiArrowUp } from "react-icons/hi";
import { ImPause2, ImStop2, ImPlay3 } from "react-icons/im";

const Clock = () => {
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [time, setTime] = useState(sessionTime);
  const [timerMode, setTimerMode] = useState("Session");
  const [start, setStart] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [beep, setBeep] = useState(null);

  useEffect(() => {
    setBeep(new Audio("sounds/beep.wav"));
  }, []);

  useEffect(() => {
    if (isPaused) {
      return clearInterval(start);
    }
    if (time === 0) {
      clearInterval(start);

      if (timerMode === "Session") {
        setTime(breakTime);
        beep.play();
        setTimerMode("Break");
        startClock();
      } else {
        setTime(sessionTime);
        beep.play();
        setTimerMode("Session");
        startClock();
      }
    }
  }, [time]);

  const startClock = () => {
    setIsPaused(false);
    setStart(
      setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000)
    );
  };

  const stopClock = () => {
    setIsPaused(true);
    clearInterval(start);
    setTimerMode("Session");
    setTime(sessionTime);
  };

  const pauseClock = () => {
    setIsPaused(true);
  };

  return (
    <div id="Break Length" className="bg-red-50 h-screen">
      <div
        id="session-Length"
        className="flex flex-col justify-center items-center h-screen p-2"
      >
        <div className="p-4 text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          25 + 5 Clock
        </div>
        <div className="flex m-6 justify-center">
          <div className="p-6 text-2xl">
            Break Length
            <div className="flex p-4 space-x-8">
              <HiArrowDown
                id="break-decrement"
                onClick={() =>
                  setBreakTime(breakTime > 0 ? breakTime - 60 : breakTime)
                }
              />
              <div id="break-length">{breakTime / 60}</div>
              <HiArrowUp
                id="break-increment"
                onClick={() =>
                  setBreakTime(breakTime < 3600 ? breakTime + 60 : breakTime)
                }
              />
            </div>
          </div>
          <div className="p-6 text-2xl">
            Session Length
            <div className="flex p-4 space-x-8">
              <HiArrowDown
                id="session-decrement"
                className="cursor-pointer"
                onClick={() => {
                  setSessionTime(
                    sessionTime > 0 ? sessionTime - 60 : sessionTime
                  );
                  setTime(sessionTime > 0 ? sessionTime - 60 : sessionTime);
                }}
              />
              <div id="session-length">{sessionTime / 60}</div>
              <HiArrowUp
                id="session-increment"
                className="cursor-pointer"
                onClick={() => {
                  setSessionTime(
                    sessionTime < 3600 ? sessionTime + 60 : sessionTime
                  );
                  setTime(sessionTime < 3600 ? sessionTime + 60 : sessionTime);
                }}
              />
            </div>
          </div>
        </div>

        <div className="text-6xl rounded-t-2xl -mt-16">
          <div className="flex text-blue-500 space-x-8 justify-center items-center ">
            <HiTicket className="origin-bottom transform -rotate-45" />
            <HiTicket className="mb-16" />
            <HiTicket className="origin-bottom transform rotate-45" />
          </div>
          <div
            className="rounded-full h-72 w-72 -mt-16 flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500
    text-white"
          >
            <div className="text-2xl" id="timer-label">
              {timerMode}
            </div>
            <div id="time-left" and="true">
              {`${Math.floor(time / 60)}:${("00" + (time % 60)).slice(-2)}`}
            </div>
          </div>
        </div>
        <div className="mt-2 text-2xl flex space-x-8 justify-center items-center">
          <button
            type="button"
            disabled={!isPaused}
            id="start_stop"
            onClick={() => startClock()}
          >
            <ImPlay3
              className={isPaused ? null : `opacity-50 cursor-not-allowed`}
            />
          </button>
          <button onClick={() => pauseClock()}>
            <ImPause2 />
          </button>
          <button id="reset" onClick={() => stopClock()}>
            <ImStop2 />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Clock;
