import axios from 'axios';

const CLOCKIFY_API_BASE_URL = 'https://api.clockify.me/api/v1';
const CLOCKIFY_API_KEY = process.env.CLOCKIFY_API_KEY;
const WORKSPACE_ID = 'your_workspace_id_here'; // UPDATE

export interface ClockifyProject {
  id: string;
  name: string;
}

export interface ClockifyTimer {
  id: string;
  startTime: string;
  endTime: string | null;
  timeInterval: {
    duration: number;
  };
}

export const fetchClockifyProjects = async (): Promise<ClockifyProject[]> => {
  const response = await axios.get(`${CLOCKIFY_API_BASE_URL}/workspaces/${WORKSPACE_ID}/projects`, {
    headers: {
      'X-Api-Key': CLOCKIFY_API_KEY,
    },
  });

  return response.data;
};

export const startTimer = async (projectId: string): Promise<ClockifyTimer> => {
  const response = await axios.post(
    `${CLOCKIFY_API_BASE_URL}/workspaces/${WORKSPACE_ID}/timers`,
    {
      projectId,
    },
    {
      headers: {
        'X-Api-Key': CLOCKIFY_API_KEY,
      },
    }
  );

  return response.data;
};

export const stopTimer = async (timerId: string): Promise<ClockifyTimer> => {
  const response = await axios.patch(
    `${CLOCKIFY_API_BASE_URL}/workspaces/${WORKSPACE_ID}/timers/${timerId}`,
    {
      endTime: new Date().toISOString(),
    },
    {
      headers: {
        'X-Api-Key': CLOCKIFY_API_KEY,
      },
    }
  );

  return response.data;
};
