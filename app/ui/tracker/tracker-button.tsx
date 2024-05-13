'use client'

import React from 'react';

interface TrackerButtonProps {
  isTracking: boolean;
  onClick: () => void;
}

const TrackerButton: React.FC<TrackerButtonProps> = ({ isTracking, onClick }) => {
  return (
    <button onClick={onClick} className="btn">
      {isTracking ? 'Stop tracking' : 'Start tracking'}
    </button>
  );
};

export default TrackerButton;
