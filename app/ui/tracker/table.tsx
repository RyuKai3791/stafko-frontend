import Image from 'next/image';
import { UpdateProject, DeleteProject } from '@/app/ui/projects/buttons';
import ProjectStatus from '@/app/ui/projects/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProjects } from '@/app/lib/data';
import { Project } from '@/app/lib/definitions';
import { enUS } from 'date-fns/locale';
import { format } from 'date-fns';
import TrackerButton from '@/app/ui/tracker/tracker-button';
import TrackerCounter from '@/app/ui/tracker/tracker-counter';

export default async function ProjectsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const projects = await fetchFilteredProjects(query, currentPage);

  const formatDateToLocal = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy LLL d', { locale: enUS });
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
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Dates
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tracker
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {projects?.map((project: Project) => (
                <tr key={project.id} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{project.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{project.description}</td>
                  <td className="whitespace-nowrap px-3 py-3">{formatCurrency(project.amount)}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(project.start_date)} - {formatDateToLocal(project.end_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ProjectStatus status={project.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-4 pr-3">
                    <div className="flex gap-3">
                      <TrackerCounter />
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
};
