import Image from 'next/image';
import { UpdateProject, DeleteProject } from '@/app/ui/projects/buttons';
import ProjectStatus from '@/app/ui/projects/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProjects } from '@/app/lib/data';
import { Project } from '@/app/lib/definitions';
import { enUS } from 'date-fns/locale';
import { format } from 'date-fns';
import { ClockifyTimer, fetchClockifyProjects, startTimer, stopTimer } from '@/app/lib/clockify';
import { useState, useEffect } from 'react';

export default async function ProjectsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const projects = await fetchFilteredProjects(query, currentPage);
  const clockifyProjects = await fetchClockifyProjects();

  const [trackedTimes, setTrackedTimes] = useState<Record<string, string>>({});
  const [activeTimers, setActiveTimers] = useState<Record<string, string>>({});

  const formatDateToLocal = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy LLL d', { locale: enUS });
  };

  const handleStartTimer = async (projectId: string) => {
    const timer = await startTimer(projectId);
    setActiveTimers((prevTimers) => ({
      ...prevTimers,
      [projectId]: timer.id,
    }));
  };

  const handleStopTimer = async (projectId: string) => {
    const timerId = activeTimers[projectId];
    if (timerId) {
      const timer = await stopTimer(timerId);
      setTrackedTimes((prevTrackedTimes) => ({
        ...prevTrackedTimes,
        [projectId]: calculateTotalTimeTracked(prevTrackedTimes[projectId], timer),
      }));
      setActiveTimers((prevTimers) => {
        const updatedTimers = { ...prevTimers };
        delete updatedTimers[projectId];
        return updatedTimers;
      });
    }
  };

  const calculateTotalTimeTracked = (
    prevTrackedTime: string | undefined,
    timer: ClockifyTimer
  ): string => {
    if (!prevTrackedTime) {
      return formatClockifyTime(timer.timeInterval.duration);
    }
  
    const [prevHours, prevMinutes] = prevTrackedTime.split('h ').map(part => parseInt(part));
    const prevTotalSeconds = prevHours * 3600 + prevMinutes * 60;
  
    const currentTotalSeconds = prevTotalSeconds + timer.timeInterval.duration;
    const currentHours = Math.floor(currentTotalSeconds / 3600);
    const currentMinutes = Math.floor((currentTotalSeconds % 3600) / 60);
  
    return formatClockifyTime(currentTotalSeconds);
  };
  
  const formatClockifyTime = (durationInSeconds: number): string => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-sky-100 bg-opacity-95 p-2 md:pt-0">
          <div className="md:hidden">
            {projects?.map((project: Project) => (
              <div
                key={project.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/*<Image
                        src={project.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${project.name}'s profile picture`}
                      />*/}
                      <p>{project.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{project.description}</p>
                  </div>
                  <ProjectStatus status={project.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(project.amount)}
                    </p>
                    <p>{formatDateToLocal(project.start_date)} - {formatDateToLocal(project.end_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateProject id={project.id} />
                    <DeleteProject id={project.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Project
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Dates
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tracked time
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {projects?.map((project: Project) => (
                <tr
                  key={project.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/*<Image
                        src={project.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${project.name}'s profile picture`}
                      />*/}
                      <p>{project.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(project.start_date)} - {formatDateToLocal(project.end_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {trackedTimes[project.id] || '0h 0m'}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {activeTimers[project.id] ? (
                        <button
                          className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          onClick={() => handleStopTimer(project.id)}
                        >
                          Stop Tracker
                        </button>
                      ) : (
                        <button
                          className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                          onClick={() => handleStartTimer(project.id)}
                        >
                          Start Tracker
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
