'use client'

import React, { useState, useEffect } from 'react';

interface TrackerCounterProps {
  isTracking: boolean;
}

const TrackerCounter: React.FC<TrackerCounterProps> = ({ isTracking }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isTracking) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer!);
    }

    return () => clearInterval(timer!);
  }, [isTracking]);

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return <div>{formatTime(time)}</div>;
};

export default TrackerCounter;
