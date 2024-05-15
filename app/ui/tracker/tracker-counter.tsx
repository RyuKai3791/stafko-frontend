'use client'

import { PlayIcon, StopIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';

const TrackerCounter: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className='flex items-center'>
      <div className='mr-10 w-20 text-left'>{formatTime(counter)}</div>
      <button className='bg-blue-600 text-white px-4 py-2 rounded mr-3 transition-colors hover:bg-blue-400' onClick={handleStart}>Start Tracking <PlayIcon className='h-6 w-6 pl-1 inline-flex' /></button>

      <button className='bg-red-600 text-white px-4 py-2 rounded mr-3 transition-colors hover:bg-red-500' onClick={handleStop}>Stop <StopIcon className='h-6 w-6 pl-1 inline-flex' /></button>
    </div>
  );
};

export default TrackerCounter;
