import { useState, useEffect } from 'react';

export const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return {
    startTimer,
    stopTimer,
    time: parseFloat(time.toFixed(1)),
  };
};
