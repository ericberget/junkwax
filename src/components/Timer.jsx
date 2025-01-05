import { useState, useEffect } from 'react';

export function Timer({ isActive, onTimeChange }) {
  const [time, setTime] = useState(30);

  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          onTimeChange(newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, time, onTimeChange]);

  return (
    <div className="text-center mb-4">
      <div className={`text-2xl font-bold ${time <= 10 ? 'text-red-500' : 'text-white'}`}>
        {time}s
      </div>
    </div>
  );
} 